import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { deleteUser, getAllUsers } from "../../../store/admin";
import Loading from "../../../shared/components/Loading";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Block, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { allUsers, loading, error } = useAppSelector((state) => state.admin);
  const token = useAppSelector((state) => state.user.adminToken);
  const [filter, setFilter] = useState<"Admin" | "User" | "">("");
  const lang = useAppSelector((state) => state.app.lang);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const handleFilter = (f: "Admin" | "User" | "") => (e: React.MouseEvent) => {
    setFilter(f);
  };
  const handleDelete = (_id?: string) => (e: React.MouseEvent) => {
    if (window.confirm(lang === "Ru" ? "Вы хотите удалить?" : "Are u sure?")) {
      dispatch(deleteUser({ id: _id, token })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast(lang === "Ru" ? "Удалено" : "Deleted", { type: "success" });
        }
      });
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <TableContainer component={Paper}>
        <Button variant="outlined" onClick={handleFilter("Admin")}>
          {lang === "Ru" ? "Отфильтровать по Admin" : "Filter by Admin"}
        </Button>
        <Button variant="outlined" onClick={handleFilter("User")}>
          {lang === "Ru" ? "Отфильтровать по User" : "Filter by User"}
        </Button>
        <Button
          variant="outlined"
          disabled={filter === ""}
          onClick={handleFilter("")}
        >
          {lang === "Ru" ? "Сбросить" : "Reset filter"}
        </Button>

        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{lang === "En" ? "Username" : "Юзернейм"}</TableCell>
              <TableCell>{lang === "En" ? "role" : "роль"}</TableCell>
              <TableCell>{lang === "En" ? "Status" : "Статус"}</TableCell>
              <TableCell>{lang === "En" ? "Action" : "Правление"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter === ""
              ? allUsers.map((e) => (
                  <TableRow key={e._id}>
                    <TableCell>{e.username}</TableCell>
                    <TableCell>{e.role}</TableCell>
                    <TableCell>{e.status}</TableCell>

                    <TableCell>
                      <IconButton onClick={handleDelete(e.username)}>
                        <Delete />
                      </IconButton>
                      <IconButton>
                        {e.status === "Banned" ? <></> : <Block />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : allUsers
                  .filter((e) => e.role === filter)
                  .map((e) => (
                    <TableRow key={e._id}>
                      <TableCell>{e.username}</TableCell>
                      <TableCell>{e.role}</TableCell>
                      <TableCell>{e.status}</TableCell>

                      <TableCell>
                        <IconButton>
                          <Delete />
                        </IconButton>
                        <IconButton>
                          <Block />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersPage;
