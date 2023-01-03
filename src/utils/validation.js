import Joi from "joi";

export const loginSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
});

export const eventSchema = Joi.object({
  data: Joi.string()
    .pattern(new RegExp("^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$"))
    .required(),
  time: Joi.string()
    .pattern(new RegExp("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"))
    .required(),
  categoryName: Joi.string().required(),
  subCategoryName: Joi.string().required(),
  orderType: Joi.string().required(),
  link: Joi.string().required(),
  userName: Joi.string().min(3).required(),
  profession: Joi.string().required(),
  telNumber: Joi.string()
    // .pattern(new RegExp("/^998([378]{2}|(9[013-57-9]))\d{7}$/"))
    .required(),
  description: Joi.string().min(5).required(),
  subjectText: Joi.string().min(10).required(),
});
