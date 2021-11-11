import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import {PrivateAdminRoute} from './middleware'
import HomeSetting from '../containers/admin/homeSetting/index'
import AdminAssignment from "../containers/admin/assignment/index";
import AdminAddLevel from "../containers/admin/assignment/level/index";
import AdminAddProgram from "../containers/admin/assignment/program/index";
import AdminAddExam from "../containers/admin/assignment/exam/index";
import AdminAddPart from "../containers/admin/assignment/part/index";
import AdminProgramDetail from "../containers/admin/assignment/program/detail/index";
import AdminExamDetail from "../containers/admin/assignment/exam/detail/index";
import AdminReplit from '../containers/admin/replit/index'
import AdminTeacher from "../containers/admin/teacher/index";
import AdminStudent from "../containers/admin/student/index";
import AdminSubject from "../containers/admin/subject/index";

export default function AdminRoutes() {
  
  return (
    <Router>
      <Switch>
        <PrivateAdminRoute exact path="/admin/assignment">
          <AdminAssignment />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/assignment/:id">
          <AdminAddPart />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/part/:id">
          <AdminAddLevel />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/level/program/:id">
          <AdminAddProgram />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/level/exam/:id">
          <AdminAddExam />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/program/:id">
          <AdminProgramDetail />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/exam/:id">
          <AdminExamDetail />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/home-setting">
          <HomeSetting />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/replit">
          <AdminReplit />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/teacher">
          <AdminTeacher />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/student">
          <AdminStudent />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/subject">
          <AdminSubject />
        </PrivateAdminRoute>
      </Switch>
    </Router>
  );
}
