import { AnimationSection } from "@/app/components/framer/animation-context";
import { ContentLayout } from "@/components/dashboard/content-layout";
import { getServerAuthSession } from "@/server/auth";

const Page = async () => {
  const session = await getServerAuthSession();
  return (
    <ContentLayout>
      <h1 className="text-4xl font-bold">Posts</h1>
      <AnimationSection>
        <p className="text-lg">Posts</p>
      </AnimationSection>
    </ContentLayout>
  );
}
export default Page;