import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isAccount, setIsAccount] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

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
    if (iscurrentState !== "Account") {
      setIsAccount(false);
    }
    if (iscurrentState !== "Contact") {
      setIsAccount(false);
    }
    if (iscurrentState !== "Job") {
      setIsAccount(false);
    }
    if (iscurrentState !== "Report") {
      setIsAccount(false);
    }
    if (iscurrentState !== "Settings") {
      setIsSettings(false);
    }
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isAccount,
    isContact,
    isJob,
    isReport,
    isSettings,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "account",
      label: "Accounts",
      icon: "ri-map-pin-line",
      link: "/#",
      stateVariables: isAccount,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isAccount);
        setIscurrentState("Account");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "account-listing",
          label: "All Accounts",
          link: "/accounts",
          parentId: "account",
        },
        {
          id: "account-creation",
          label: "Create New Account",
          link: "/account/account-creation",
          parentId: "account",
        },
      ],
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: "ri-user-fill",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isContact);
        setIscurrentState("Contact");
        updateIconSidebar(e);
      },
      stateVariables: isContact,
      subItems: [
        {
          id: "contacts",
          label: "All Contacts",
          link: "/",
          parentId: "contact",
        },
        {
          id: "newContacts",
          label: "Create New Contact",
          link: "/",
          parentId: "contact",
        },
      ],
    },
    {
      label: "pages",
      isHeader: true,
    },
    {
      id: "job",
      label: "Job Openings",
      icon: "ri-search-eye-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAuth(!isJob);
        setIscurrentState("Job");
        updateIconSidebar(e);
      },
      stateVariables: isJob,
      subItems: [
        {
          id: "jobs",
          label: "All Openings",
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
          id: "jobMassImports",
          label: "Mass Imports",
          link: "/",
          parentId: "job",
        },
      ],
    },
    {
      id: "report",
      label: "Reports",
      icon: "bx bx-file",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPages(!isReport);
        setIscurrentState("Report");
        updateIconSidebar(e);
      },
      stateVariables: isReport,
      subItems: [
        {
          id: "starter",
          label: "Starter",
          link: "/pages-starter",
          parentId: "pages",
        },
        {
          id: "profile",
          label: "Profile",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "pages",
          stateVariables: isProfile,
          childItems: [
            {
              id: 1,
              label: "Simple Page",
              link: "/pages-profile",
              parentId: "pages",
            },
            {
              id: 2,
              label: "Settings",
              link: "/pages-profile-settings",
              parentId: "pages",
            },
          ],
        },
        { id: "team", label: "Team", link: "/pages-team", parentId: "pages" },
        {
          id: "timeline",
          label: "Timeline",
          link: "/pages-timeline",
          parentId: "pages",
        },
        { id: "faqs", label: "FAQs", link: "/pages-faqs", parentId: "pages" },
        {
          id: "pricing",
          label: "Pricing",
          link: "/pages-pricing",
          parentId: "pages",
        },
        {
          id: "gallery",
          label: "Gallery",
          link: "/pages-gallery",
          parentId: "pages",
        },
        {
          id: "maintenance",
          label: "Maintenance",
          link: "/pages-maintenance",
          parentId: "pages",
        },
        {
          id: "comingSoon",
          label: "Coming Soon",
          link: "/pages-coming-soon",
          parentId: "pages",
        },
        {
          id: "sitemap",
          label: "Sitemap",
          link: "/pages-sitemap",
          parentId: "pages",
        },
        {
          id: "searchResults",
          label: "Search Results",
          link: "/pages-search-results",
          parentId: "pages",
        },
        {
          id: "privacyPolicy",
          label: "Privacy Policy",
          link: "/pages-privacy-policy",
          parentId: "pages"
        },
        {
          id: "termsConditions",
          label: "Term & Conditions",
          link: "/pages-term-conditions",
          parentId: "pages",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: "ri-rocket-line",
      link: "/#",
      stateVariables: isSettings,
      click: function (e) {
        e.preventDefault();
        setIsLanding(!isSettings);
        setIscurrentState("Settings");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "general",
          label: "General",
          link: "/",
          parentId: "settings",
        },
        {
          id: "usersControl",
          label: "Users and Contro",
          link: "/",
          parentId: "settings",
        },
        {
          id: "customisation",
          label: "Customisation",
          link: "/",
          parentId: "settings",
        },
        {
          id: "resumeManagement",
          label: "Resume Management",
          link: "/",
          parentId: "settings",
        },
      ],
    },
    // {
    //   label: "Components",
    //   isHeader: true,
    // },
    // {
    //   id: "baseUi",
    //   label: "Base UI",
    //   icon: "bx bx-palette",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsBaseUi(!isBaseUi);
    //     setIscurrentState("BaseUi");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isBaseUi,
    //   subItems: [
    //     {
    //       id: "alerts",
    //       label: "Alerts",
    //       link: "/ui-alerts",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "badges",
    //       label: "Badges",
    //       link: "/ui-badges",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "buttons",
    //       label: "Buttons",
    //       link: "/ui-buttons",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "colors",
    //       label: "Colors",
    //       link: "/ui-colors",
    //       parentId: "baseUi",
    //     },
    //     { id: "cards", label: "Cards", link: "/ui-cards", parentId: "baseUi" },
    //     {
    //       id: "carousel",
    //       label: "Carousel",
    //       link: "/ui-carousel",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "dropdowns",
    //       label: "Dropdowns",
    //       link: "/ui-dropdowns",
    //       parentId: "baseUi",
    //     },
    //     { id: "grid", label: "Grid", link: "/ui-grid", parentId: "baseUi" },
    //     {
    //       id: "images",
    //       label: "Images",
    //       link: "/ui-images",
    //       parentId: "baseUi",
    //     },
    //     { id: "tabs", label: "Tabs", link: "/ui-tabs", parentId: "baseUi" },
    //     {
    //       id: "accordions",
    //       label: "Accordion & Collapse",
    //       link: "/ui-accordions",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "modals",
    //       label: "Modals",
    //       link: "/ui-modals",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "offcanvas",
    //       label: "Offcanvas",
    //       link: "/ui-offcanvas",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "placeholders",
    //       label: "Placeholders",
    //       link: "/ui-placeholders",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "progress",
    //       label: "Progress",
    //       link: "/ui-progress",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "notifications",
    //       label: "Notifications",
    //       link: "/ui-notifications",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "media",
    //       label: "Media object",
    //       link: "/ui-media",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "embedvideo",
    //       label: "Embed Video",
    //       link: "/ui-embed-video",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "typography",
    //       label: "Typography",
    //       link: "/ui-typography",
    //       parentId: "baseUi",
    //     },
    //     { id: "lists", label: "Lists", link: "/ui-lists", parentId: "baseUi" },
    //     { id: "links", label: "Links", link: "/ui-links", parentId: "baseUi" , badgeName: "New", badgeColor: "success"},
    //     {
    //       id: "general",
    //       label: "General",
    //       link: "/ui-general",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "ribbons",
    //       label: "Ribbons",
    //       link: "/ui-ribbons",
    //       parentId: "baseUi",
    //     },
    //     {
    //       id: "utilities",
    //       label: "Utilities",
    //       link: "/ui-utilities",
    //       parentId: "baseUi",
    //     },
    //   ],
    // },
    // {
    //   id: "advanceUi",
    //   label: "Advance UI",
    //   icon: "bx bx-briefcase-alt",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsAdvanceUi(!isAdvanceUi);
    //     setIscurrentState("AdvanceUi");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isAdvanceUi,
    //   subItems: [
    //     {
    //       id: "nestablelist",
    //       label: "Nestable List",
    //       link: "/advance-ui-nestable",
    //       parentId: "advanceUi",
    //     },
    //     {
    //       id: "scrollbar",
    //       label: "Scrollbar",
    //       link: "/advance-ui-scrollbar",
    //       parentId: "advanceUi",
    //     },
    //     {
    //       id: "animation",
    //       label: "Animation",
    //       link: "/advance-ui-animation",
    //       parentId: "advanceUi",
    //     },
    //     {
    //       id: "tour",
    //       label: "Tour",
    //       link: "/advance-ui-tour",
    //       parentId: "advanceUi",
    //     },
    //     {
    //       id: "swiperslider",
    //       label: "Swiper Slider",
    //       link: "/advance-ui-swiper",
    //       parentId: "advanceUi",
    //     },
    //     {
    //       id: "ratings",
    //       label: "Ratings",
    //       link: "/advance-ui-ratings",
    //       parentId: "advanceUi",
    //     },
    //     {
    //       id: "highlight",
    //       label: "Highlight",
    //       link: "/advance-ui-highlight",
    //       parentId: "advanceUi",
    //     },
    //   ],
    // },
    // {
    //   id: "widgets",
    //   label: "Widgets",
    //   icon: "bx bx-aperture",
    //   link: "/widgets",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIscurrentState("Widgets");
    //   },
    // },
    // {
    //   id: "forms",
    //   label: "Forms",
    //   icon: "bx bx-receipt",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsForms(!isForms);
    //     setIscurrentState("Forms");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isForms,
    //   subItems: [
    //     {
    //       id: "basicelements",
    //       label: "Basic Elements",
    //       link: "/forms-elements",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "formselect",
    //       label: "Form Select",
    //       link: "/forms-select",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "checkboxsradios",
    //       label: "Checkboxs & Radios",
    //       link: "/forms-checkboxes-radios",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "pickers",
    //       label: "Pickers",
    //       link: "/forms-pickers",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "inputmasks",
    //       label: "Input Masks",
    //       link: "/forms-masks",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "advanced",
    //       label: "Advanced",
    //       link: "/forms-advanced",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "rangeslider",
    //       label: "Range Slider",
    //       link: "/forms-range-sliders",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "validation",
    //       label: "Validation",
    //       link: "/forms-validation",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "wizard",
    //       label: "Wizard",
    //       link: "/forms-wizard",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "editors",
    //       label: "Editors",
    //       link: "/forms-editors",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "fileuploads",
    //       label: "File Uploads",
    //       link: "/forms-file-uploads",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "formlayouts",
    //       label: "Form Layouts",
    //       link: "/forms-layouts",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "select2",
    //       label: "Select2",
    //       link: "/forms-select2",
    //       parentId: "forms",
    //     },
    //   ],
    // },
    // {
    //   id: "tables",
    //   label: "Tables",
    //   icon: "bx bx-table",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsTables(!isTables);
    //     setIscurrentState("Tables");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isTables,
    //   subItems: [
    //     {
    //       id: "basictables",
    //       label: "Basic Tables",
    //       link: "/tables-basic",
    //       parentId: "tables",
    //     },
        
    //     {
    //       id: "listjs",
    //       label: "List Js",
    //       link: "/tables-listjs",
    //       parentId: "tables",
    //     },
        
    //     { 
    //       id: "reactdatatables", 
    //       label: "React Datatables", 
    //       link: "/tables-react", 
    //       parentId: "tables" },
    //   ],
    // },
    // {
    //   id: "charts",
    //   label: "Charts",
    //   icon: "bx bx-doughnut-chart",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsCharts(!isCharts);
    //     setIscurrentState("Charts");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isCharts,
    //   subItems: [
    //     {
    //       id: "apexcharts",
    //       label: "Apexcharts",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsApex(!isApex);
    //       },
    //       stateVariables: isApex,
    //       childItems: [
    //         { id: 1, label: "Line", link: "/charts-apex-line" },
    //         { id: 2, label: "Area", link: "/charts-apex-area" },
    //         { id: 3, label: "Column", link: "/charts-apex-column" },
    //         { id: 4, label: "Bar", link: "/charts-apex-bar" },
    //         { id: 5, label: "Mixed", link: "/charts-apex-mixed" },
    //         { id: 6, label: "Timeline", link: "/charts-apex-timeline" },
    //         { id: 7, label: "Range Area", link: "/charts-apex-range-area", badgeName: "New", badgeColor: "success" },
    //         { id: 8, label: "Funnel", link: "/charts-apex-funnel", badgeName: "New", badgeColor: "success"},
    //         { id: 9, label: "Candlstick", link: "/charts-apex-candlestick" },
    //         { id: 10, label: "Boxplot", link: "/charts-apex-boxplot" },
    //         { id: 11, label: "Bubble", link: "/charts-apex-bubble" },
    //         { id: 12, label: "Scatter", link: "/charts-apex-scatter" },
    //         { id: 13, label: "Heatmap", link: "/charts-apex-heatmap" },
    //         { id: 14, label: "Treemap", link: "/charts-apex-treemap" },
    //         { id: 15, label: "Pie", link: "/charts-apex-pie" },
    //         { id: 16, label: "Radialbar", link: "/charts-apex-radialbar" },
    //         { id: 17, label: "Radar", link: "/charts-apex-radar" },
    //         { id: 18, label: "Polar", link: "/charts-apex-polar" },
    //       ],
    //     },
    //     {
    //       id: "chartjs",
    //       label: "Chartjs",
    //       link: "/charts-chartjs",
    //       parentId: "charts",
    //     },
    //     {
    //       id: "echarts",
    //       label: "Echarts",
    //       link: "/charts-echarts",
    //       parentId: "charts",
    //     },
    //   ],
    // },
    // {
    //   id: "icons",
    //   label: "Icons",
    //   icon: "bx bx-tone",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsIcons(!isIcons);
    //     setIscurrentState("Icons");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isIcons,
    //   subItems: [
    //     {
    //       id: "remix",
    //       label: "Remix",
    //       link: "/icons-remix",
    //       parentId: "icons",
    //     },
    //     {
    //       id: "boxicons",
    //       label: "Boxicons",
    //       link: "/icons-boxicons",
    //       parentId: "icons",
    //     },
    //     {
    //       id: "materialdesign",
    //       label: "Material Design",
    //       link: "/icons-materialdesign",
    //       parentId: "icons",
    //     },
    //     {
    //       id: "lineawesome",
    //       label: "Line Awesome",
    //       link: "/icons-lineawesome",
    //       parentId: "icons",
    //     },
    //     {
    //       id: "feather",
    //       label: "Feather",
    //       link: "/icons-feather",
    //       parentId: "icons",
    //     },
    //     {
    //       id: "crypto",
    //       label: "Crypto SVG",
    //       link: "/icons-crypto",
    //       parentId: "icons"
    //     },
    //   ],
    // },
    // {
    //   id: "maps",
    //   label: "Maps",
    //   icon: "bx bx-map-alt",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsMaps(!isMaps);
    //     setIscurrentState("Maps");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMaps,
    //   subItems: [
    //     {
    //       id: "google",
    //       label: "Google",
    //       link: "/maps-google",
    //       parentId: "maps",
    //     },
    //     {
    //       id: "vector",
    //       label: "Vector",
    //       link: "/maps-vector",
    //       parentId: "maps",
    //     },
    //     {
    //       id: "leaflet",
    //       label: "Leaflet",
    //       link: "/maps-leaflet",
    //       parentId: "maps",
    //     },
    //   ],
    // },
    // {
    //   id: "multilevel",
    //   label: "Multi Level",
    //   icon: "bx bx-sitemap",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsMultiLevel(!isMultiLevel);
    //     setIscurrentState("MuliLevel");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMultiLevel,
    //   subItems: [
    //     {
    //       id: "level1.1",
    //       label: "Level 1.1",
    //       link: "/#",
    //       parentId: "multilevel",
    //     },
    //     {
    //       id: "level1.2",
    //       label: "Level 1.2",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsLevel1(!isLevel1);
    //       },
    //       stateVariables: isLevel1,
    //       childItems: [
    //         { id: 1, label: "Level 2.1", link: "/#" },
    //         {
    //           id: "level2.2",
    //           label: "Level 2.2",
    //           link: "/#",
    //           isChildItem: true,
    //           click: function (e) {
    //             e.preventDefault();
    //             setIsLevel2(!isLevel2);
    //           },
    //           stateVariables: isLevel2,
    //           childItems: [
    //             { id: 1, label: "Level 3.1", link: "/#" },
    //             { id: 2, label: "Level 3.2", link: "/#" },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
