import { useZodForm } from "@/components/ui/form";
import { CourseFormSchema } from "./course.schema";

export type CourseFormProps = {
  defaultValue: CourseFormSchema;
}

export const CourseForm = (props : CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: props.defaultValue
  });

  // return,
}