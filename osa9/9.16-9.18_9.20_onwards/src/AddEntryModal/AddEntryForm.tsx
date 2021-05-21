import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField } from "./FormField";
import { Entry } from '../types';

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export type EntryFormValues = Omit<Entry, "id" | "type" | "discharge" | "healthcheckrating" >;

export const AddEntryForm: React.FC<Props> = ( { onSubmit, onCancel }) => {
    return(
        <Formik
        initialValues={{
            date: "",
            specialist: "",
            description: ""
        }}
        onSubmit={onSubmit}
        /*
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.name = requiredError;
          }
          if (!values.specialist) {
            errors.ssn = requiredError;
          }
          if (!values.description) {
            errors.dateOfBirth = requiredError;
          }
          return errors;
        }}
        */
      >
        {({ isValid, dirty }) => {
          return (
            <Form className="form ui">
              <Field
                label="Date"
                placeholder="Date"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    )   
}

export default AddEntryForm;