import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
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
    {
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
        {
          id: "accounts",
          label: "All Accounts",
          link: "/accounts",
          parentId: "account",
        },
        {
          id: "newAccount",
          label: "Create New Account",
          link: "/account/account-creation",
          parentId: "account",
        },
      ],
    },

    // Contacts
    {
      id: "contact",
      label: "Contacts",
      icon: "ri-user-3-fill",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsContacts(!isContacts);
        setIscurrentState("Contacts");
        updateIconSidebar(e);
      },
      stateVariables: isContacts,
      subItems: [
        {
          id: "allContacts",
          label: "All Contacts",
          link: "/contacts",
          parentId: "contact",
        },
        {
          id: "newContact",
          label: "Create New Contacts",
          link: "/contact/contact-creation",
          parentId: "contact",
        },
      ],
    },
    // {
    //   id: "contact",
    //   label: "Contacts",
    //   icon: "ri-user-3-fill",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsContacts(!isContacts);
    //     setIscurrentState("Contact");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isContacts,
    //   subItems: [
    //     {
    //       id: "contacts",
    //       label: "All Contacts",
    //       link: "/contacts",
    //       parentId: "contact",
    //     },
    //     {
    //       id: "newContact",
    //       label: "Create New Contact",
    //       link: "/contact/contact-creation",
    //       parentId: "contact",
    //     },
    //   ],
    // },

    // Job Openings
    {
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
        {
          id: "jobs",
          label: "All Job Openings",
          link: "/jobs",
          parentId: "job",
        },
        {
          id: "newJob",
          label: "Create Job Openings",
          link: "/job/job-creation",
          parentId: "job",
        },
        {
          id: "jobMassImport",
          label: "Mass Imports",
          link: "/job/mass-imports",
          parentId: "job",
        },
      ],
    },

    // Candidates
    {
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
        {
          id: "allCandidates",
          label: "All Candidates",
          link: "/candidates",
          parentId: "candidates",
        },
        {
          id: "newCandidate",
          label: "Create New Candidate",
          link: "/candidate/candidate-creation",
          parentId: "candidates",
        },
      ],
    },

    // Reports
    {
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
          id: "allReports",
          label: "All Reports",
          link: "/reports",
          parentId: "reports",
        },
        {
          id: "newReport",
          label: "Create New Report",
          link: "/report/report-creation",
          parentId: "reports",
        },
      ],
    },

    // Settings
    {
      id: "settings",
      label: "Settings",
      icon: "ri-settings-4-fill",
      link: "/#",
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
          link: "/jobs",
          parentId: "settings",
        },
        {
          id: "usersControl",
          label: "Users and Control",
          link: "/settings/control",
          parentId: "settings",
        },
        {
          id: "customisation",
          label: "Customisation",
          link: "/settings/customisation",
          parentId: "settings",
        },
        {
          id: "resumeManagement",
          label: "Resume Management",
          link: "/settings/resume-management",
          parentId: "settings",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
