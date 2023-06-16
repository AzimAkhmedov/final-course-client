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
  const initialValues = {
    collectionName: "",
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

  return (
    <div className={"container " + s.root}>
      <h1>Создать Коллекцию</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          className={s.collectionName}
          placeholder="Имя Коллекции"
          id="collectionName"
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
        <button type="submit">Создать Коллекцию</button>
      </form>
    </div>
  );
};

export default NewCollectionPage;
