import User from "../models/users.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.status(200).json({
            success: true,
            data: user,
        });
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: user,
        });
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: user,
        });
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}

