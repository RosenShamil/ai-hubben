import { CourseOverview } from "@/components/akademin/course-overview";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return <CourseOverview courseId={courseId} />;
}
