import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import {PrivateCompanyRoute, PrivateCompanyAdminRoute} from './middleware'
import CompanyAssignment from "../containers/company/assignment/index";
import CompanyAddLevel from "../containers/company/assignment/level/index";
import CompanyAddProgram from "../containers/company/assignment/program/index";
import CompanyAddExam from "../containers/company/assignment/exam/index";
import CompanyAddPart from "../containers/company/assignment/part/index";
import CompanyProgramDetail from "../containers/company/assignment/program/detail/index";
import CompanyExamDetail from "../containers/company/assignment/exam/detail/index";
import CompanyReplit from '../containers/company/replit/index'
import CompanyTeacher from "../containers/company/teacher/index";
import CompanyStudent from "../containers/company/student/index";
import CompanyAdmin from "../containers/company/admin/index";
import ChangePassword from "../containers/company/admin/change";
import CompanySubject from "../containers/company/subject/index";

export default function CompanyRoutes() {
  
  return (
    <Router>
      <Switch>
        <PrivateCompanyAdminRoute exact path="/company/assignment">
          <CompanyAssignment />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/assignment/:id">
          <CompanyAddPart />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/part/:id">
          <CompanyAddLevel />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/level/program/:id">
          <CompanyAddProgram />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/level/exam/:id">
          <CompanyAddExam />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/program/:id">
          <CompanyProgramDetail />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/exam/:id">
          <CompanyExamDetail />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/replit">
          <CompanyReplit />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/teacher">
          <CompanyTeacher />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/student">
          <CompanyStudent />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/changePassword">
          <ChangePassword />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyAdminRoute exact path="/company/subject">
          <CompanySubject />
        </PrivateCompanyAdminRoute>
        <PrivateCompanyRoute exact path="/company/admin">
          <CompanyAdmin />
        </PrivateCompanyRoute>
      </Switch>
    </Router>
  );
}
