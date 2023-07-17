import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import {
  createAdmin,
  deleteAdmin,
  deleteUser,
  getAllUsers,
  setStatus,
} from "../../../store/admin";
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
import s from "./index.module.scss";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allUsers, loading, error } = useAppSelector((state) => state.admin);
  const token = useAppSelector((state) => state.user.adminToken);
  const [filter, setFilter] = useState<
    "Admin" | "User" | "" | "Banned" | "Not-Banned"
  >("");
  const { lang, darkMode } = useAppSelector((state) => state.app);
  const username = useAppSelector((state) => state.user.username);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const handleFilter = (f: "Admin" | "User" | "") => (e: React.MouseEvent) => {
    setFilter(f);
  };
  const handleSetAdmin = (user: string) => (e: React.MouseEvent) => {
    dispatch(createAdmin({ username: user, token })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast(lang === "Ru" ? "Админ создан" : "promoted to Admin", {
          type: "success",
        });
      } else {
        toast(lang === "Ru" ? "Ошибка" : "Error", { type: "error" });
      }
    });
    dispatch(getAllUsers());
  };
  const handleDeleteAdmin =
    (u: string, _id: string | undefined) => (e: React.MouseEvent) => {
      if (u === username) {
        if (
          window.confirm(
            lang === "En"
              ? "Sure to remove your admin?"
              : "Уверенны в удалении себя из админов?"
          )
        ) {
          dispatch(deleteAdmin({ _id, token })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
              toast(lang === "Ru" ? "Админ удален" : "Admin removed", {
                type: "success",
              });
              dispatch(logOut());
            } else {
              toast(lang === "Ru" ? "Ошибка" : "Error", { type: "error" });
            }
          });
        }
        return;
      }
      if (
        window.confirm(
          lang === "En"
            ? "Sure to remove admin?"
            : "Уверенны в удалении админа?"
        )
      ) {
        dispatch(deleteAdmin({ _id, token })).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast(lang === "Ru" ? "Админ удален" : "Admin removed", {
              type: "success",
            });
            dispatch(getAllUsers());
          } else {
            toast(lang === "Ru" ? "Ошибка" : "Error", { type: "error" });
          }
        });
      }
    };
  const handleFilterByStatus =
    (f: "Banned" | "Not-Banned" | "") => (e: React.MouseEvent) => {
      setFilter(f);
    };
  const handleDelete = (_id?: string) => (e: React.MouseEvent) => {
    if (window.confirm(lang === "Ru" ? "Вы хотите удалить?" : "Are u sure?")) {
      dispatch(deleteUser({ id: _id, token })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast(lang === "Ru" ? "Удалено" : "Deleted", { type: "success" });
          dispatch(getAllUsers());
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
    <div className={s.root}>
      <TableContainer
        color="warning"
        sx={{
          background: darkMode ? "#000" : "",
          color: darkMode ? "#fff" : "",
          transition: ".5s ease-in",
        }}
        component={Paper}
      >
        <Button variant="outlined" onClick={handleFilter("Admin")}>
          {lang === "Ru" ? "Отфильтровать по Admin" : "Filter by Admin"}
        </Button>
        <Button variant="outlined" onClick={handleFilter("User")}>
          {lang === "Ru" ? "Отфильтровать по User" : "Filter by User"}
        </Button>
        <Button variant="outlined" onClick={handleFilterByStatus("Banned")}>
          {lang === "Ru" ? "Отфильтровать забаненных" : "Filter by banned"}
        </Button>

        <Button variant="outlined" onClick={handleFilterByStatus("Not-Banned")}>
          {lang === "Ru"
            ? "Отфильтровать не забаненных"
            : "Filter by not-banned"}
        </Button>
        <Button
          variant="outlined"
          disabled={filter === ""}
          onClick={handleFilter("")}
          color={darkMode ? "warning" : "primary"}
        >
          {lang === "Ru" ? "Сбросить" : "Reset filter"}
        </Button>

        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: darkMode ? "#fff" : "",
                }}
              >
                {lang === "En" ? "Username" : "Юзернейм"}
              </TableCell>
              <TableCell
                sx={{
                  color: darkMode ? "#fff" : "",
                }}
              >
                {lang === "En" ? "role" : "роль"}
              </TableCell>
              <TableCell
                sx={{
                  color: darkMode ? "#fff" : "",
                }}
              >
                {lang === "En" ? "Status" : "Статус"}
              </TableCell>
              <TableCell
                sx={{
                  color: darkMode ? "#fff" : "",
                }}
              >
                {" "}
                {lang === "En" ? "Action" : "Правление"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter === ""
              ? allUsers.map((e) => (
                  <TableRow key={e._id}>
                    <TableCell
                      sx={{
                        color: darkMode ? "#fff" : "",
                        maxWidth: "200px",
                      }}
                    >
                      {e.username}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: darkMode ? "#fff" : "",
                      }}
                    >
                      {e.role}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: darkMode ? "#fff" : "",
                      }}
                    >
                      {e.status}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: darkMode ? "#fff" : "",
                      }}
                    >
                      <IconButton
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                        onClick={handleDelete(e.username)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                        onClick={handleSetStatus(e.status, e)}
                      >
                        {e.status === "Banned" ? <Undo /> : <Block />}
                      </IconButton>
                      {e.role === "Admin" ? (
                        <Button
                          color="warning"
                          onClick={handleDeleteAdmin(e.username, e._id)}
                        >
                          {lang === "En" ? "Remove admin" : "Убрать админа"}
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          onClick={handleSetAdmin(e.username)}
                        >
                          {lang === "En"
                            ? "Promote to admin"
                            : "Сделать админом"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : filter === "Admin" || filter === "User"
              ? allUsers
                  .filter((e) => e.role === filter)
                  .map((e) => (
                    <TableRow key={e._id}>
                      <TableCell
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                      >
                        {e.username}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                      >
                        {e.role}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                      >
                        {e.status}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                      >
                        <IconButton
                          sx={{
                            color: darkMode ? "#fff" : "",
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          sx={{
                            color: darkMode ? "#fff" : "",
                          }}
                        >
                          <Block />
                        </IconButton>
                        {e.role === "Admin" ? (
                          <Button
                            color="warning"
                            onClick={handleDeleteAdmin(e.username, e._id)}
                          >
                            {lang === "En" ? "Remove admin" : "Убрать админа"}
                          </Button>
                        ) : (
                          <Button
                            color="success"
                            onClick={handleSetAdmin(e.username)}
                          >
                            {lang === "En"
                              ? "Promote to admin"
                              : "Сделать админом"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              : allUsers
                  .filter((e) => e.status === filter)
                  .map((e) => (
                    <TableRow key={e._id}>
                      <TableCell
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                      >
                        {e.username}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                      >
                        {e.role}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                      >
                        {e.status}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                      >
                        <IconButton
                          sx={{
                            color: darkMode ? "#fff" : "",
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          sx={{
                            color: darkMode ? "#fff" : "",
                          }}
                        >
                          <Block />
                        </IconButton>
                        {e.role === "Admin" ? (
                          <Button
                            color="warning"
                            onClick={handleDeleteAdmin(e.username, e._id)}
                          >
                            {lang === "En" ? "Remove admin" : "Убрать админа"}
                          </Button>
                        ) : (
                          <Button
                            color="success"
                            onClick={handleSetAdmin(e.username)}
                          >
                            {lang === "En"
                              ? "Promote to admin"
                              : "Сделать админом"}
                          </Button>
                        )}
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
