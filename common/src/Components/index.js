// Common components

import BreadCrumb from "./Common/BreadCrumb";
import getChartColorsArray from "./Common/ChartsDynamicColor";
import DeleteModal from "./Common/DeleteModal";
import ExportCSVModal from "./Common/ExportCSVModal";
import {
  DefaultColumnFilter,
  Filter,
  SelectColumnFilter,
} from "./Common/filters";
import FullScreenDropdown from "./Common/FullScreenDropdown";
import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
  LeadsGlobalFilter,
} from "./Common/GlobalSearchFilter";
import LanguageDropdown from "./Common/LanguageDropdown";
import LightDark from "./Common/LightDark";
import Loader from "./Common/Loader";
import MyCartDropdown from "./Common/MyCartDropdown";
import NotificationDropdown from "./Common/NotificationDropdown";
import Pagination from "./Common/Pagination";
import PreviewCardHeader from "./Common/PreviewCardHeader";
import Prism from "./Common/Prism";
import ProfileDropdown from "./Common/ProfileDropdown";
import ReviewSlider from "./Common/ReviewSlider";
import RightSidebar from "./Common/RightSidebar";
import SearchOption from "./Common/SearchOption";
import TableContainer from "./Common/TableContainer";
import TableContainerReactTable from "./Common/TableContainerReactTable";
import UiContent from "./Common/UiContent";
import WebAppsDropdown from "./Common/WebAppsDropdown";
import FormInput from "./Common/FormInput";
import FormSelection from "./Common/FormSelection";
import CustomViewButton from "./Common/CustomViewButton";
import TooltipWrapper from "./Tooltip/TooltipWrapper";

// Router
import withRouter from "./Common/withRouter";

// Constants
import {
  layoutTypes,
  layoutModeTypes,
  leftSidebarTypes,
  layoutWidthTypes,
  layoutPositionTypes,
  topbarThemeTypes,
  leftsidbarSizeTypes,
  leftSidebarViewTypes,
  leftSidebarImageTypes,
  preloaderTypes,
  sidebarVisibilitytypes,
} from "./constants/layout";

// Import Dynamic Form builder and Form display
import FormBuilder from "./DynamicForm/components/formbuilder/FormBuilder";
import Form from "./DynamicForm/components/formdisplay/Form";

//Import Dynamic Table
import DynamicTable from "./DynamicTable/DynamicTable";
import useTableHook from "./DynamicTable/useTableHook";

// Import Delete Modal
import DeleteCustomModal from "./DeleteModal/DeleteCustomModal";
import DeleteCustomModal2 from "./DeleteModal2/DeleteCustomModal2";

// Import general Modal
import GeneralModal from "./GeneralModal/GeneralModal";

// Import Custom Nav
import CustomNav from "./CustomNav/CustomNav";

// Import Ckeditor
import Ckeditor from "./ckeditor/build/ckeditor";

// Import Template Display
import TemplateDisplayV3 from "./TemplateDisplay/TemplateDisplayV3";
import TemplateDisplayV4 from "./TemplateDisplay/TemplateDisplayV4";
import TemplateSelectByCategoryElement from "./TemplateDisplay/TemplateSelectByCategoryElement/TemplateSelectByCategoryElement";
import TemplateExportButtons from "./TemplateDisplay/TemplateExportButtons/TemplateExportButtons";
import TemplatePagePreviewModal from "./TemplateDisplay/TemplatePagePreviewModal/TemplatePagePreviewModal";
import TemplateAdvanceExportModal from "./TemplateDisplay/TemplateAdvanceExportModal/TemplateAdvanceExportModal";
import PageSettingViewBackend from "./TemplateDisplay/components/PageSettingViewBackend";
// Import Elements
import SelectElement from "./Elements/SelectElement";
import MultiInputFormik from "./Elements/MultiInputFormik";
import MultiInputFormikNoBorder from "./Elements/MultiInputFormikNoBorder";
import CreateSelectElement from "./Elements/CreateSelectElement";

// Import Email Component
import EmailComponent from "./Email/EmailComponent";

// import CustomView from "./CustomView/CustomView";

// Import Email V2 Component
import EmailTo from "./EmailV2/EmailTo";
import EmailCCBCC from "./EmailV2/EmailCCBCC";
import EmailSubject from "./EmailV2/EmailSubject";
import EmailTemplateSelect from "./EmailV2/EmailTemplateSelect/EmailTemplateSelect";
import EmailAttachments from "./EmailV2/EmailAttachments";
import EmailVariableSelect from "./EmailV2/EmailVariableSelect/EmailVariableSelect";

// Import Side drawer
import SideDrawer from "./PreviewTemplateDrawer/SideDrawer";

// Import Filter
import TableFilter from "./Filter/TableFilter";

export {
  BreadCrumb,
  getChartColorsArray,
  DeleteModal,
  ExportCSVModal,
  DefaultColumnFilter,
  Filter,
  SelectColumnFilter,
  FullScreenDropdown,
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
  LeadsGlobalFilter,
  LanguageDropdown,
  LightDark,
  Loader,
  MyCartDropdown,
  NotificationDropdown,
  Pagination,
  PreviewCardHeader,
  Prism,
  ProfileDropdown,
  ReviewSlider,
  RightSidebar,
  SearchOption,
  TableContainer,
  TableContainerReactTable,
  UiContent,
  WebAppsDropdown,
  withRouter,
  FormInput,
  FormSelection,
  //Layout
  layoutTypes,
  layoutModeTypes,
  leftSidebarTypes,
  layoutWidthTypes,
  layoutPositionTypes,
  topbarThemeTypes,
  leftsidbarSizeTypes,
  leftSidebarViewTypes,
  leftSidebarImageTypes,
  preloaderTypes,
  sidebarVisibilitytypes,

  // Export form builder and form display
  FormBuilder,
  Form,

  // Export Dynamic Table
  DynamicTable,
  useTableHook,

  // Export Delete Modal
  DeleteCustomModal,
  DeleteCustomModal2,

  // Export general Modal
  GeneralModal,

  // Export Custom Nav
  CustomNav,

  // Export Ckeditor (More Features)
  Ckeditor,

  // Export Template Display
  TemplateDisplayV3,
  TemplateDisplayV4,
  TemplateSelectByCategoryElement,
  TemplateExportButtons,
  TemplatePagePreviewModal,
  TemplateAdvanceExportModal,
  PageSettingViewBackend,

  // Export Elements
  SelectElement,
  MultiInputFormik,
  MultiInputFormikNoBorder,
  CreateSelectElement,

  // Export Email Component
  EmailComponent,

  // Custom View
  // CustomView,

  // Tool Tip
  TooltipWrapper,

  // Email V2 Component
  EmailTo,
  EmailCCBCC,
  EmailSubject,
  EmailTemplateSelect,
  EmailAttachments,
  EmailVariableSelect,

  // Side Drawer
  SideDrawer,

  // Filter
  TableFilter,
};
