import { MainNav } from "@/components/menubar/menubar";
import { Heading2 } from "@/components/typography/typography";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function ApplicationsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      {/* <div className="md:hidden">
          <Image
            src="/examples/forms-light.png"
            width={1280}
            height={791}
            alt="Forms"
            className="block dark:hidden"
          />
          <Image
            src="/examples/forms-dark.png"
            width={1280}
            height={791}
            alt="Forms"
            className="hidden dark:block"
          />
        </div> */}

      <div className=" space-y-6 p-10 pb-16 md:block sm:block">
        <div className="flex h-16 items-center px-4">
          <div className="space-y-0.5">
            <Heading2 text="Applications" />
          </div>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          {/* <aside className="-mx-4 lg:w-1/5">
            </aside> */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
