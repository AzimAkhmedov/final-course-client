import { Add } from "@mui/icons-material";
import { Box, Button, Drawer, SwipeableDrawer, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks";
import { useFormik } from "formik";
import { getCollectionParams } from "../../../../store/collections";
import { addToCollection } from "../../../../store/items";
import { IItem } from "../../../../types";
import { toast } from "react-toastify";

const Toolbar = ({ collection }: any) => {
  const params = useAppSelector((state) => state.collections.collectionParams);
  const { darkMode, lang } = useAppSelector((state) => state.app);
  const username = useAppSelector((state) => state.user.username);
  const [toggle, setToggle] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({});
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      const newItem: IItem = {
        username,
        collectionName: collection,
        params: val,
      };
      console.log(val);
      
      dispatch(addToCollection(newItem)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast(
            lang === "Ru"
              ? "Новый предмет добавлен успешно"
              : "New Item added succesfuly",
            { type: "success" }
          );
        }
      });
    },
  });
  useEffect(() => {
    params.forEach((e: any) => {
      setInitialValues({ ...initialValues, [e.name]: "" });
    });
  }, [params]);
  useEffect(() => {
    console.log(initialValues);
    dispatch(getCollectionParams({ username, collection }));
    setInitialValues({});
  }, []);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(initialValues);

      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setToggle(open);
    };
  return (
    <aside>
      <div>
        <Button onClick={toggleDrawer(true)}>
          Create New Item
          <Add />
        </Button>
      </div>
      <SwipeableDrawer
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        anchor="right"
        open={toggle}
        sx={{ background: darkMode ? "rgba(0, 0, 0, 0.685)" : "" }}
      >
        <Box
          sx={{
            width: 300,
            background: darkMode ? "rgba(0, 0, 0, 0.685)" : "",
            padding: "20px 20px",
          }}
          role="presentation"
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              onChange={formik.handleChange}
              label="Имя предмета"
              variant="filled"
              fullWidth
            />
            {params.map((e, i) => (
              <TextField
                fullWidth
                label={e.name}
                variant="filled"
                key={i}
                required
                id={e.name}
                type={e.type}
                onChange={formik.handleChange}
              />
            ))}
            <Button type="submit">Создать</Button>
          </form>
        </Box>
      </SwipeableDrawer>
    </aside>
  );
};

export default Toolbar;
