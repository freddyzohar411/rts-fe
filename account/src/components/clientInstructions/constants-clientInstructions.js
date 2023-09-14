import * as yup from 'yup';
export const populateGuideLinesInitialValues = (data) => {
    console.log("populateGuideLinesInitialValues", data )
    return {
        submissionGuidelines: data.guidelines,
    }
}

export const guideLinesInitialValues = {
    submissionGuidelines: "",
}

export const guideLinesSchema = yup.object().shape({
    submissionGuidelines:  yup.string().nullable().notRequired(),
})

export const instructionInitialValues = {
    clientInstrDocs: ""
}

export const instructionSchema = yup.object().shape({
    clientInstrDocs: yup.mixed().notRequired()
})