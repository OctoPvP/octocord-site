import { AnimationSection } from "@/app/components/framer/animation-context";
import { ContentLayout } from "@/components/dashboard/content-layout";
import { getServerAuthSession } from "@/server/auth";

const Page = async () => {
  const session = await getServerAuthSession();
  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-4xl font-bold">Hello, {session?.user.name}</h1>
      <AnimationSection>
        <p className="text-lg">Welcome to the dashboard!</p>
      </AnimationSection>
    </ContentLayout>
  );
}
export default Page;