import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getAllUsers } from "../../../store/admin";
import Loading from "../../../shared/components/Loading";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Approval, Delete } from "@mui/icons-material";
const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { allUsers, loading, token, error } = useAppSelector(
    (state) => state.admin
  );
  const lang = useAppSelector((state) => state.app.lang);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{lang === "En" ? "Username" : "Юзернейм"}</TableCell>
              <TableCell>{lang === "En" ? "role" : "роль"}</TableCell>
              <TableCell>{lang === "En" ? "Action" : "Правление"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((e) => (
              <TableRow key={e._id}>
                <TableCell>{e.username}</TableCell>
                <TableCell>{e.role}</TableCell>
                <TableCell>
                  <IconButton>
                    <Delete />
                  </IconButton>
                  <IconButton>
                    <Approval />
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
