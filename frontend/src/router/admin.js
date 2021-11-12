import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import {PrivateAdminRoute} from './middleware'
import HomeSetting from '../containers/admin/homeSetting/index'
import Assignment from "../containers/admin/assignment/index";
import AddLevel from "../containers/admin/assignment/level/index";
import AddProgram from "../containers/admin/assignment/program/index";
import AddExam from "../containers/admin/assignment/exam/index";
import AdminAddPart from "../containers/admin/assignment/part/index";
import ProgramDetail from "../containers/admin/assignment/program/detail/index";
import ExamDetail from "../containers/admin/assignment/exam/detail/index";
import Replit from '../containers/admin/replit/index'
import Teacher from "../containers/admin/teacher/index";
import Student from "../containers/admin/student/index";
import Subject from "../containers/admin/subject/index";
import Company from "../containers/admin/company/index";

export default function AdminRoutes() {
  
  return (
    <Router>
      <Switch>
        <PrivateAdminRoute exact path="/admin/assignment">
          <Assignment />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/assignment/:id">
          <AdminAddPart />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/part/:id">
          <AddLevel />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/level/program/:id">
          <AddProgram />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/level/exam/:id">
          <AddExam />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/program/:id">
          <ProgramDetail />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/exam/:id">
          <ExamDetail />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/home-setting">
          <HomeSetting />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/replit">
          <Replit />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/teacher">
          <Teacher />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/student">
          <Student />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/subject">
          <Subject />
        </PrivateAdminRoute>
        <PrivateAdminRoute exact path="/admin/company">
          <Company />
        </PrivateAdminRoute>
      </Switch>
    </Router>
  );
}
