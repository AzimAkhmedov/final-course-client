import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { deleteUser, getAllUsers, setStatus } from "../../../store/admin";
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
import { Block, Delete, Undo } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IUser } from "../../../types";
import { logOut } from "../../../store/user";
import { useNavigate } from "react-router-dom";
const UsersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allUsers, loading, error } = useAppSelector((state) => state.admin);
  const token = useAppSelector((state) => state.user.adminToken);
  const [filter, setFilter] = useState<"Admin" | "User" | "">("");
  const lang = useAppSelector((state) => state.app.lang);
  const username = useAppSelector((state) => state.user.username);
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
  const handleSetStatus =
    (status: string, user: IUser) => (e: React.MouseEvent) => {
      if (status === "Banned") {
        dispatch(
          setStatus({
            status: "Not-Banned",
            password: user.password,
            role: user.role,
            username: user.username,
            token,
          })
        ).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            dispatch(getAllUsers());
          }
        });
      } else {
        if (user.username === username) {
          if (
            window.confirm(
              lang === "En"
                ? "If you will ban yourself, you will logout, ar u sure?"
                : "Забанив себя вы покинете приложение, уверены?"
            )
          ) {
            dispatch(
              setStatus({
                status: "Banned",
                password: user.password,
                role: user.role,
                username: user.username,
                token,
              })
            ).then((res) => {
              if (res.meta.requestStatus === "fulfilled") {
                dispatch(getAllUsers());
              }
            });
            dispatch(logOut());
            navigate("/");
          }
          return;
        }
        if (
          window.confirm(
            lang === "En" ? "Are u sure to ban?" : "Уверен в бане?"
          )
        ) {
          dispatch(
            setStatus({
              status: "Banned",
              password: user.password,
              role: user.role,
              username: user.username,
              token,
            })
          ).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
              dispatch(getAllUsers());
            }
          });
        }
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
                      <IconButton onClick={handleSetStatus(e.status, e)}>
                        {e.status === "Banned" ? <Undo /> : <Block />}
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
