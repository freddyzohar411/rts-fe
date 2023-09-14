import * as yup from 'yup';

export const populateAccountValues = (account) => {
    console.log(account.accountInformation.accountName)
    return {
        accName: account.accountInformation.accountName,
        accStatus: account.accountInformation.accountStatus,
        accRating: account.accountInformation.accountRating,
        accSource: account.accountInformation.accountSource,
        msa: account.accountInformation.msa,
        agreementDoc: null,
        leadSalesName: account.leadInformation.salesName,
        leadAccName: account.leadInformation.accountName,
        salesName: account.accountInformation.salesName,
        industry: account.accountInformation.accountIndustry,
        subIndustry: account.accountInformation.subIndustry,
        noEmployees: account.accountInformation.noOfEmployees,
        annualRev: account.accountInformation.revenueAmt,
        parentComp: account.accountInformation.parentCompany,
        website: account.accountInformation.website,
        landline: account.accountInformation.landlineNumber,
        secOwner: account.accountInformation.secondaryOwner,
        leadSource: account.leadInformation.leadSource,
        line1: account.addressInformation.address.line1,
        line2: account.addressInformation.address.line2,
        line3: account.addressInformation.address.line3,
        city: account.addressInformation.address.city,
        country: account.addressInformation.address.country,
        postalCode: account.addressInformation.address.postalCode,
        isSameAsAddress: account.isSameAsAddress,
        billingLine1: account.addressInformation.billingAddress.line1,
        billingLine2: account.addressInformation.billingAddress.line2,
        billingLine3: account.addressInformation.billingAddress.line3,
        billingCity: account.addressInformation.billingAddress.city,
        billingCountry: account.addressInformation.billingAddress.country,
        billingPostalCode: account.addressInformation.billingAddress.postalCode,
        accRemarks:account.accountRemarks
    };
}

export let initialValues = {
    // Required Values (8)
    accName: "",
    accStatus: "",
    accRating: "",
    accSource: "",
    msa: 0,

    // File Doc 
    agreementDoc: "",

    // Lead Values (2)
    leadSalesName: "",
    leadAccName: "",

    // Non-required Values (25)
    salesName: "",
    industry: 0,
    subIndustry: 0,
    noEmployees: 0,
    annualRev: 0,
    parentComp: 0,
    website: "",
    landline: 0,
    secOwner: "",
    leadSource: "",

    // Addresses
    line1: "",
    line2: "",
    line3: "",
    city: "",
    country: "",
    postalCode: "",
    isSameAsAddress: false,
    billingLine1: "",
    billingLine2: "",
    billingLine3: "",
    billingCity: "",
    billingCountry: "",
    billingPostalCode: "",

    //Account remarks
    accRemarks: ""
};

export const schema = yup.object().shape({
    accName: yup.string().required("Please enter an account name."),
    accStatus: yup.string().required("Please select an account status."),
    accRating: yup.string().required("Please select an account rating."),
    accSource: yup.string().required("Please select an account source."),
    msa: yup.string().required("Please make a selection."),
    agreementDoc: yup.mixed().required("Please upload a document."),
    leadSalesName: yup.string().required("Please enter a sales name."),
    leadAccName: yup.string().required("Please enter an account name."),

    salesName: yup.string().notRequired().nullable(),   
    industry: yup.string().notRequired().nullable(),
    subIndustry: yup.string().notRequired().nullable(),
    noEmployees: yup.string().notRequired().nullable(),
    annualRev: yup.string().notRequired().nullable(),
    parentComp: yup.string().notRequired().nullable(),
    website: yup.string().notRequired().nullable(),
    landline: yup.string().notRequired().nullable(),
    secOwner: yup.string().notRequired().nullable(),
    leadSource: yup.string().notRequired().nullable(),
    line1: yup.string().notRequired().nullable(),
    line2: yup.string().notRequired().nullable(),
    line3: yup.string().notRequired().nullable(),
    city: yup.string().notRequired().nullable(),
    country: yup.string().notRequired().nullable(),
    postalCode: yup.string().notRequired().nullable(),
    billingLine1: yup.string().notRequired().nullable(),
    billingLine2: yup.string().notRequired().nullable(),
    billingLine3: yup.string().notRequired().nullable(),
    billingCity: yup.string().notRequired().nullable(),
    billingCountry: yup.string().notRequired().nullable(),
    billingPostalCode: yup.string().notRequired().nullable(),
    accRemarks:yup.string().notRequired().nullable()
});