import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthHelper from "../helpers/auth_helper";
import { useUserAuth } from "@workspace/login";

const Navdata = () => {
  const { checkAllPermission, Permission, checkAnyPermission } = useUserAuth();
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);

  const [isAccounts, setIsAccounts] = useState(false);

  const [isContacts, setIsContacts] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isCandidates, setIsCandidates] = useState(false);
  const [isReports, setIsReports] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    // Fixed the arrow and active
    const a = e.target.closest("a");
    if (a && a.classList.contains("active")) {
      a.classList.remove("active");
      a.setAttribute("aria-expanded", "false");
    } else {
      const navLink = document.querySelectorAll(".nav-link.menu-link");
      let navLinkItems = [...navLink];
      navLinkItems.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-expanded", "false");
      });
      // Remove all active from  alla with only nav-link and active
      const navLinkActive = document.querySelectorAll(".nav-link.active");
      let navLinkActiveItems = [...navLinkActive];
      navLinkActiveItems.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-expanded", "false");
      });

      // Find all div with id=sidebarApps and remove the show class
      const sidebarApps = document.querySelectorAll("#sidebarApps");
      let sidebarAppsItems = [...sidebarApps];
      sidebarAppsItems.forEach((item) => {
        item.classList.remove("show");
      });

      a.classList.add("active");
      a.setAttribute("aria-expanded", "true");
    }

    // when a menu is open and i click other menu, i want to close the previous menu
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Contacts") {
      setIsContacts(false);
    }
    if (iscurrentState !== "Job") {
      setIsJob(false);
    }
    if (iscurrentState !== "Candidates") {
      setIsCandidates(false);
    }
    if (iscurrentState !== "Reports") {
      setIsReports(false);
    }
    if (iscurrentState !== "Settings") {
      setIsSettings(false);
    }
    if (iscurrentState !== "Accounts") {
      setIsAccounts(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAccounts,
    isContacts,
    isCandidates,
    isReports,
    isJob,
    isSettings,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    // Dashboard
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "bx bxs-dashboard",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },

    // Accounts
    checkAnyPermission([Permission.ACCOUNT_READ, Permission.ACCOUNT_WRITE]) && {
      id: "account",
      label: "Accounts",
      icon: "ri-map-pin-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAccounts(!isAccounts);
        setIscurrentState("Accounts");
        updateIconSidebar(e);
      },
      stateVariables: isAccounts,
      subItems: [
        checkAllPermission([Permission.ACCOUNT_READ]) && {
          id: "accounts",
          label: "All Accounts",
          link: "/accounts",
          parentId: "account",
        },
        checkAllPermission([Permission.ACCOUNT_WRITE]) && {
          id: "newAccount",
          label: "Create New Account",
          link: "/accounts/create",
          parentId: "account",
        },
      ].filter(Boolean),
    },

    // Contacts (Hide first)
    // {
    //   id: "contact",
    //   label: "Contacts",
    //   icon: "ri-user-3-fill",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsContacts(!isContacts);
    //     setIscurrentState("Contacts");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isContacts,
    //   subItems: [
    //     {
    //       id: "allContacts",
    //       label: "All Contacts",
    //       link: "/contacts",
    //       parentId: "contact",
    //     },
    //     {
    //       id: "newContact",
    //       label: "Create New Contacts",
    //       link: "/contact/contact-creation",
    //       parentId: "contact",
    //     },
    //   ],
    // },

    // Job Openings
    checkAnyPermission([Permission.JOB_READ, Permission.JOB_WRITE]) && {
      id: "job",
      label: "Job Openings",
      icon: "ri-search-eye-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsJob(!isJob);
        setIscurrentState("Job");
        updateIconSidebar(e);
      },
      stateVariables: isJob,
      subItems: [
        checkAllPermission([Permission.JOB_READ]) && {
          id: "jobs",
          label: "All Job Openings",
          link: "/jobs",
          parentId: "job",
        },
        checkAllPermission([Permission.JOB_WRITE]) && {
          id: "newJob",
          label: "Create Job Openings",
          link: "/jobs/job-creation",
          parentId: "job",
        },
        // {
        //   id: "jobMassImport",
        //   label: "Mass Imports",
        //   link: "/job/mass-imports",
        //   parentId: "job",
        // },
      ].filter(Boolean),
    },

    // Candidates
    checkAnyPermission([
      Permission.CANDIDATE_READ,
      Permission.CANDIDATE_WRITE,
    ]) && {
      id: "candidates",
      label: "Candidates",
      icon: "ri-user-follow-fill",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsCandidates(!isCandidates);
        setIscurrentState("Candidates");
        updateIconSidebar(e);
      },
      stateVariables: isCandidates,
      subItems: [
        checkAllPermission([Permission.CANDIDATE_READ]) && {
          id: "allCandidates",
          label: "All Candidates",
          link: "/candidates",
          parentId: "candidates",
        },
        checkAllPermission([Permission.CANDIDATE_WRITE]) && {
          id: "newCandidate",
          label: "Create New Candidate",
          link: "/candidates/new",
          parentId: "candidates",
        },
      ].filter(Boolean),
    },


    // Settings
    checkAllPermission([...Permission.SETTING_ALL]) && {
      id: "settings",
      label: "Settings",
      icon: "ri-settings-4-fill",
      link: "/settings",
      click: function (e) {
        e.preventDefault();
        setIsSettings(!isSettings);
        setIscurrentState("Settings");
        updateIconSidebar(e);
      },
      stateVariables: isSettings,
      subItems: [
        {
          id: "settingsGeneral",
          label: "General",
          link: "/settings/general",
          parentId: "settings",
        },
        // {
        //   id: "usersControl",
        //   label: "Users and Control",
        //   link: "/settings/control",
        //   parentId: "settings",
        // },
        // {
        //   id: "customisation",
        //   label: "Customisation",
        //   link: "/settings/customisation",
        //   parentId: "settings",
        // },
        // {
        //   id: "resumeManagement",
        //   label: "Resume Management",
        //   link: "/settings/resume-management",
        //   parentId: "settings",
        // },
      ].filter(Boolean),
    },

    
    // Reports
    checkAllPermission([...Permission.SETTING_ALL]) && {
      id: "reports",
      label: "Reports",
      icon: "ri-bar-chart-grouped-fill",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsReports(!isReports);
        setIscurrentState("Reports");
        updateIconSidebar(e);
      },
      stateVariables: isReports,
      subItems: [
        {
          id: "overviewReports",
          label: "Overview Report",
          link: "/reports/job-report",
          parentId: "reports",
        },
      ],
    },
  ].filter(Boolean)
  
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
