import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Pagination,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  deleteReport,
  deleteUser,
  getAllReports,
  getAllUsers,
} from "../services/admin";

const AdminPanel = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [usersPage, setUsersPage] = useState(1);
  const [userPagesCount, setUserPagesCount] = useState(0);
  const [reportsPage, setReportsPage] = useState(1);
  const [reportPagesCount, setReportPagesCount] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState<{
    type: "user" | "report";
    id: number | null;
  }>({ type: "user", id: null });
  const limit = 20;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (tab == 0) {
          const data = await getAllUsers(usersPage, limit);
          setUsers(data.data);
          data.total % limit == 0
            ? setUserPagesCount(data.total / limit)
            : setUserPagesCount(Math.floor(data.total / limit) + 1);
        } else {
          const data = await getAllReports(reportsPage, limit);
          setReports(data.data);
          data.total % limit == 0
            ? setReportPagesCount(data.total / limit)
            : setReportPagesCount(Math.floor(data.total / limit) + 1);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tab, usersPage, reportsPage]);

  const handleDelete = async () => {
    if (!deleteDialog.id) return;
    try {
      if (deleteDialog.type === "user") {
        await deleteUser(deleteDialog.id);
        setUsers((prev) => prev.filter((u) => u.id !== deleteDialog.id));
      } else {
        await deleteReport(deleteDialog.id);
        setReports((prev) => prev.filter((r) => r.id !== deleteDialog.id));
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setDeleteDialog({ type: "user", id: null });
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Tabs value={tab} onChange={(_e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Users" />
        <Tab label="Reports" />
      </Tabs>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {tab === 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Button
                            color="error"
                            onClick={() =>
                              setDeleteDialog({ type: "user", id: user.id })
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={userPagesCount}
                page={usersPage}
                onChange={(_e, val) => setUsersPage(val)}
                sx={{ mt: 2 }}
              />
            </>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>License Plates</TableCell>
                      <TableCell>Latitude</TableCell>
                      <TableCell>Longitude</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>{report.description}</TableCell>
                        <TableCell>{report.licensePlate?.join(", ")}</TableCell>
                        <TableCell>{report.latitude}</TableCell>
                        <TableCell>{report.longitude}</TableCell>
                        <TableCell>
                          <Button
                            color="error"
                            onClick={() =>
                              setDeleteDialog({ type: "report", id: report.id })
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={reportPagesCount}
                page={reportsPage}
                onChange={(_e, val) => setReportsPage(val)}
                sx={{ mt: 2 }}
              />
            </>
          )}
        </>
      )}

      <Dialog
        open={deleteDialog.id !== null}
        onClose={() => setDeleteDialog({ type: "user", id: null })}
      >
        <DialogTitle>
          Are you sure you want to delete this {deleteDialog.type}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ type: "user", id: null })}>
            Cancel
          </Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
