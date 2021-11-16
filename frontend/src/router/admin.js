import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import {PrivateAdminRoute, PrivateTeamAdminRoute} from './middleware'
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
import Team from "../containers/admin/team/index";

export default function AdminRoutes() {
  
  return (
    <Router>
      <Switch>
        <PrivateTeamAdminRoute exact path="/admin/assignment">
          <Assignment />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/assignment/:id">
          <AdminAddPart />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/part/:id">
          <AddLevel />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/level/program/:id">
          <AddProgram />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/level/exam/:id">
          <AddExam />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/program/:id">
          <ProgramDetail />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/exam/:id">
          <ExamDetail />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/home-setting">
          <HomeSetting />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/replit">
          <Replit />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/teacher">
          <Teacher />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/student">
          <Student />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/subject">
          <Subject />
        </PrivateTeamAdminRoute>
        <PrivateTeamAdminRoute exact path="/admin/company">
          <Company />
        </PrivateTeamAdminRoute>
        <PrivateAdminRoute exact path="/admin/team">
          <Team />
        </PrivateAdminRoute>
      </Switch>
    </Router>
  );
}
