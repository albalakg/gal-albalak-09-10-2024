import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { MessagesEnum, ErrorCodes } from "../enums/MessagesEnum.js";
import RoutesEnum from "../enums/RoutesEnum.js";
import ConfigurationModel from "../database/Configuration.js";
const router = Router();
router.post(RoutesEnum.CONFIGURATION, (req, res) => {
    const config = ConfigurationModel.getConfiguration();
    if (!config) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: MessagesEnum.GET_CONFIGURATION_ERROR,
            error_code: ErrorCodes.CONFIGURATION,
            data: null
        });
        return;
    }
    res.status(StatusCodes.OK).json({
        message: MessagesEnum.GET_CONFIGURATION_SUCCESS,
        data: {
            polling_frequency: config.polling_frequency,
            score: config.score
        }
    });
});
router.post(RoutesEnum.LOGIN, (req, res) => {
    const { client_id } = req.body;
    if (!ConfigurationModel.isClientExistsById(client_id)) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: MessagesEnum.INVALID_CLIENT_ID,
            error_code: ErrorCodes.LOGIN,
            data: null
        });
        return;
    }
    res.status(StatusCodes.OK).json({
        message: MessagesEnum.LOGIN_SUCCESS,
        data: {
            token: ConfigurationModel.getClientTokenById(client_id)
        }
    });
});
router.get(RoutesEnum.GET_SCORE, (req, res) => {
    const { client_token } = req.body;
    if (!ConfigurationModel.isClientExistsByToken(client_token)) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: MessagesEnum.INVALID_CLIENT_TOKEN,
            error_code: ErrorCodes.GET_SCORE,
            data: null
        });
        return;
    }
    res.status(StatusCodes.OK).json({
        message: MessagesEnum.GET_SCORE_SUCCESS,
        data: {
            score: ConfigurationModel.getRandomScore()
        }
    });
});
export default router;
