import path from "path";
import { read, write } from "../utils/model.js";

const eventPost = (req, res) => {
  let events = read("events");
  let categories = read("categories");
  let subCategories = read("subCategories");

  let {
    data,
    time,
    categoryName,
    subCategoryName,
    orderType,
    link,
    userName,
    profession,
    telNumber,
    description,
    subjectText,
  } = req.body;

  let { picture } = req.files;

  let fileName = Date.now() + picture.name.replace(/\s/g, " ");
  picture.mv(path.resolve("uploads", fileName));

  let newEvent = {
    eventId: events.at(-1)?.eventId + 1 || 1,
    data,
    time,
    categoryName,
    subCategoryName,
    orderType,
    link,
    userName,
    profession,
    telNumber,
    description,
    picture: fileName,
    subjectText,
    status: 201,
    views: 0,
  };

  let newCategory = {
    categoryId: categories.at(-1)?.categoryId + 1 || 1,
    categoryName,
  };

  let newSubCategory = {
    subCategoryId: subCategories.at(-1)?.subCategoryId + 1 || 1,
    categoryId: subCategories.at(-1)?.categoryId + 1 || 1,
    subCategoryName,
  };

  categories.push(newCategory);
  write("categories", categories);

  subCategories.push(newSubCategory);
  write("subCategories", subCategories);

  events.push(newEvent);
  write("events", events);

  res.status(201).json({
    status: 201,
    message: "everything is fine",
    data: newEvent,
  });
};

const eventGet = (req, res) => {
  let events = read("events");
  let {
    data,
    categoryName,
    orderType,
    userName,
    page = 1,
    limit = 9,
  } = req.query;
  if (events) {
    return res.send(events.slice((page - 1) * limit, page * limit));
  }

  let eventFilter = events.filter(
    (event) =>
      event.data == data ||
      event.categoryName == categoryName ||
      event.orderType == orderType ||
      event.userName == userName,
  );

  res.send(eventFilter);
};

const eventAdminGet = (req, res) => {
  let events = read("events");

  let event = events.map((event) => {
    return {
      description: event.description,
      orderType: event.orderType,
      telNumber: event.telNumber,
      data: event.data,
      time: event.time,
      profession: event.profession,
      status: 200,
    };
  });

  res.send(event);
};

const eventByIdGet = (req, res) => {
  let events = read("events");
  let { id } = req.params;
  let count = 0;

  // let eventFilter = events.filter((event) => (event.views = count++));
  let event = events.find((event) => event.eventId == id);
  // console.log(event);

  res.send(event);
};

export default {
  eventPost,
  eventGet,
  eventAdminGet,
  eventByIdGet,
};
