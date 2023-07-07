import { Box, SwipeableDrawer, TextField } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../../shared/hooks";
interface IEditProps {
  params: any;
  itemName: string;
  collectionName: string;
  username: string;
  _id?: string;
  setOpen: Function;
  open: boolean;
}
const EditBar = ({
  params,
  collectionName,
  itemName,
  username,
  setOpen,
  open,
  _id,
}: IEditProps) => {
  const { lang, darkMode } = useAppSelector((state) => state.app);
  const toggleDrawer =
    (o: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(o);
    };
  return (
    <SwipeableDrawer
      sx={{ background: darkMode ? "rgba(0, 0, 0, 0.685)" : "" }}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      open={open}
    >
      <Box
        sx={{
          width: 300,
          padding: "20px 20px",
        }}
        role="presentation"
      >
        <form>
          <TextField
            id="name"
            label={lang === "Ru" ? "Имя предмета" : "Name of item"}
          />
          {Object.keys(params).map((e) => (
            <TextField placeholder={e}  key={e} />
          ))}
        </form>
      </Box>
    </SwipeableDrawer>
  );
};

export default EditBar;
