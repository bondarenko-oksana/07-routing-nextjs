import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NoteForm.module.css';
import { createNote } from '../../lib/api';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'Too short').max(50, 'Too long').required('Required'),
  content: Yup.string().max(500, 'Max 500 chars'),
  tag: Yup.mixed<NoteTag>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] }); 
      onSuccess(); 
    },
  });

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    mutation.mutate(values, {
      onSuccess: () => resetForm(),
      onSettled: () => setSubmitting(false),
    });
  };

  return (
    <div>
      <h2>Create note</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" className={css.input} />
              <div className={css.error}>
                <ErrorMessage name="title" />
              </div>
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
              <div className={css.error}>
                <ErrorMessage name="content" />
              </div>
            </div>

            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field as="select" id="tag" name="tag" className={css.select}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <div className={css.error}>
                <ErrorMessage name="tag" />
              </div>
            </div>

            <div className={css.actions}>
              <button type="button" className={css.cancelButton} onClick={onCancel}>
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting || mutation.isPending}
              >
                {mutation.isPending ? 'Creating...' : 'Create note'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}