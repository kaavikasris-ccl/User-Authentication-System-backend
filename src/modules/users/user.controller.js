import { HTTP_STATUS } from "@utils/httpStatus.js";
import { userService } from "@users/user.service.js";

export const store = async (req, res) => {
  try {

    // CALL SERVICE
    const user = await userService.createUser(
      req.body
    );

    console.log("CREATED USER:", user);

    // RESPONSE
    return res.status(
      HTTP_STATUS.CREATED.statusCode
    ).json({
      message: HTTP_STATUS.CREATED.message,
      data: user,
    });

  } catch (error) {

    console.log("ERROR:", error);

    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode
    ).json({
      message: error.message,
    });
  }
};