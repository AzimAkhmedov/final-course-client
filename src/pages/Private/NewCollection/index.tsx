import { useState } from "react";
import { Input, Button } from "@mui/material/";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { createCollection } from "../../../store/collections";
import s from "./NewCollection.module.scss";

const NewCollectionPage = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>("");
  const [params, setParams] = useState<Array<string>>([]);
  const { username } = useAppSelector((state) => state.user);
  const { darkMode, lang } = useAppSelector((state) => state.app);
  const initialValues = {
    collectionName: "",
    description: "",
    username,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      if (params.length === 0) {
        toast("Добавьте хоть 1 параметр", { type: "warning" });
        return;
      }
      console.log({ ...val, params });
      dispatch(createCollection({ ...val, params })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast("Успешно добавлено", { type: "success" });
        } else {
          toast("Произошла ошибка, Убедитесь что у вас нет такой коллекции", {
            type: "error",
          });
        }
      });
    },
  });

  return lang === "Ru" ? (
    <div className={"container " + s.root}>
      <h1>Создать Коллекцию</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          className={darkMode ? s.darCollectionName : s.collectionName}
          placeholder="Имя Коллекции"
          id="collectionName"
          required
          onChange={formik.handleChange}
        />
        <Input
          className={darkMode ? s.darCollectionName : s.collectionName}
          placeholder="Описание"
          id="description"
          required
          onChange={formik.handleChange}
        />

        <div className={s.params}>
          {params.length === 0 ? (
            <h2>
              Добавьте Параметры которые будут у каждого предмета в вашей
              коллекции
            </h2>
          ) : (
            <h2>Параметры вашей коллекции</h2>
          )}
          {params.map((e, i) => (
            <p key={i}>
              <span>{e}</span>{" "}
              <button
                type="button"
                onClick={() => {
                  setParams(params.filter((e, index) => i !== index));
                }}
              >
                Удалить
              </button>
            </p>
          ))}
        </div>
        {darkMode ? (
          <div className={s.darkTools}>
            <Input
              value={input}
              placeholder="Введите имя параметра"
              className={s.input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                if (input === "") {
                  toast("Вы должны заполнить поле параметра", {
                    type: "warning",
                  });
                  return;
                }
                const a = params.find((e) => e === input);
                if (a !== undefined) {
                  toast("Похоже вы уже ввели такой параметр", {
                    type: "warning",
                  });

                  return;
                }
                setParams([...params, input]);
                setInput("");
              }}
            >
              +
            </Button>
          </div>
        ) : (
          <div className={s.tools}>
            <Input
              value={input}
              placeholder="Введите имя параметра"
              className={s.input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                if (input === "") {
                  toast("Вы должны заполнить поле параметра", {
                    type: "warning",
                  });
                  return;
                }
                const a = params.find((e) => e === input);
                if (a !== undefined) {
                  toast("Похоже вы уже ввели такой параметр", {
                    type: "warning",
                  });

                  return;
                }
                setParams([...params, input]);
                setInput("");
              }}
            >
              +
            </Button>
          </div>
        )}
        <button type="submit">Создать Коллекцию</button>
      </form>
    </div>
  ) : (
    <div className={"container " + s.root}>
      <h1>Create Collection</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          className={darkMode ? s.darCollectionName : s.collectionName}
          placeholder="Collection Name"
          id="collectionName"
          required
          onChange={formik.handleChange}
        />
        <Input
          className={darkMode ? s.darCollectionName : s.collectionName}
          placeholder="Description "
          id="description"
          required
          onChange={formik.handleChange}
        />
        <div className={s.params}>
          {params.length === 0 ? (
            <h2>Add Params of your future collection</h2>
          ) : (
            <h2>Params of your future Collection</h2>
          )}
          {params.map((e, i) => (
            <p key={i}>
              <span>{e}</span>{" "}
              <button
                type="button"
                onClick={() => {
                  setParams(params.filter((e, index) => i !== index));
                }}
              >
                Delete
              </button>
            </p>
          ))}
        </div>
        {darkMode ? (
          <div className={s.darkTools}>
            <Input
              value={input}
              placeholder="Type param"
              className={s.input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                if (input === "") {
                  toast("You must enter param", {
                    type: "warning",
                  });
                  return;
                }
                const a = params.find((e) => e === input);
                if (a !== undefined) {
                  toast("Seems you already have such param", {
                    type: "warning",
                  });

                  return;
                }
                setParams([...params, input]);
                setInput("");
              }}
            >
              +
            </Button>
          </div>
        ) : (
          <div className={s.tools}>
            <Input
              value={input}
              placeholder="Type param"
              className={s.input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                if (input === "") {
                  toast("You must enter param", {
                    type: "warning",
                  });
                  return;
                }
                const a = params.find((e) => e === input);
                if (a !== undefined) {
                  toast("Seems you already have such param", {
                    type: "warning",
                  });

                  return;
                }
                setParams([...params, input]);
                setInput("");
              }}
            >
              +
            </Button>
          </div>
        )}
        <button type="submit">Create Collection</button>
      </form>
    </div>
  );
};

export default NewCollectionPage;
