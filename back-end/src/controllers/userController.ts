import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import UserModel from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
dotenv.config();

let secret: string = process.env.SESSION_SECRET as string;
let token: string = process.env.REFRESH_TOKEN_SECRET as string;

export const getAuthenticatedUser = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.userId) {
			throw createHttpError(401, "User ID not found");
		}
		const user = await UserModel.findById(req.userId).select("+email");
		if (!user) {
			throw createHttpError(404, "User not found");
		}
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

interface SignUpBody {
	username?: string;
	email?: string;
	password?: string;
}

export const signUp = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const body = req.body as SignUpBody;
	const username = body.username;
	const email = body.email;
	const passwordRaw = body.password;
	console.log(secret);
	try {
		if (!username || !email || !passwordRaw) {
			throw createHttpError(400, "Parameters missing");
		}

		const existingUsername = await UserModel.findOne({
			username: username,
		});

		if (existingUsername) {
			throw createHttpError(
				409,
				"Username already taken. Please choose a different one or log in instead."
			);
		}

		const existingEmail = await UserModel.findOne({ email: email });

		if (existingEmail) {
			throw createHttpError(
				409,
				"A user with this email address already exists. Please log in instead."
			);
		}

		const passwordHashed = await bcrypt.hash(passwordRaw, 10);

		const newUser = await UserModel.create({
			username: username,
			email: email,
			password: passwordHashed,
		});
		const token = jwt.sign({ userId: newUser._id }, secret, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign({ userId: newUser._id }, token, {
			expiresIn: "7d",
		});
		res.status(201).json({ user: newUser, token, refreshToken });
	} catch (error) {
		next(error);
	}
};

interface LoginBody {
	username?: string;
	password?: string;
}

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const body = req.body as LoginBody;
	const username = body.username;
	const password = body.password;

	try {
		if (!username || !password) {
			throw createHttpError(400, "Parameters missing");
		}

		const user = await UserModel.findOne({ username: username }).select(
			"+password"
		);
		if (!user) {
			throw createHttpError(401, "Invalid credentials");
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw createHttpError(401, "Invalid credentials");
		}

		const token = jwt.sign({ userId: user._id }, secret, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign({ userId: user._id }, token, {
			expiresIn: "7d",
		});
		res.status(200).json({ user, token, refreshToken });
	} catch (error) {
		next(error);
	}
};

export const logout = async (_req: Request, res: Response) => {
	res.clearCookie("jwtToken");

	res.json({ message: "Logged out successfully" });
};
