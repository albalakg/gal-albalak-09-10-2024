import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import MessagesEnum from "../enums/MessagesEnum.js";
import RoutesEnum from "../enums/RoutesEnum.js";
import ConfigurationModel from "../database/Configuration.js";
const router = Router();
router.post(RoutesEnum.CONFIGURATION, (req, res) => {
    const config = ConfigurationModel.getConfiguration();
    res.status(StatusCodes.OK).json({
        message: MessagesEnum.GET_CONFIGURATION_SUCCESS,
        polling_frequency: config.polling_frequency,
        score: config.score
    });
});
router.post(RoutesEnum.LOGIN, (req, res) => {
    const { client_id } = req.body;
    if (!ConfigurationModel.isClientExistsById(client_id)) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: MessagesEnum.INVALID_CLIENT_ID,
            client_token: null,
        });
        return;
    }
    res.status(StatusCodes.OK).json({
        message: MessagesEnum.LOGIN_SUCCESS,
        client_token: ConfigurationModel.getClientTokenById(client_id)
    });
});
router.get(RoutesEnum.GET_SCORE, (req, res) => {
    const { client_token } = req.body;
    if (!ConfigurationModel.isClientExistsByToken(client_token)) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: MessagesEnum.INVALID_CLIENT_TOKEN,
            score: null,
        });
        return;
    }
    res.status(StatusCodes.OK).json({
        message: MessagesEnum.GET_SCORE_SUCCESS,
        score: ConfigurationModel.getRandomScore()
    });
});
export default router;
