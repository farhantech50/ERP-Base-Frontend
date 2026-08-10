import React from "react";
import { useNavigate } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";

const Setup = () => {
  const navigate = useNavigate();

  const setupItems = [
    {
      title: "Lookup Management",
      description:
        "Create and manage system lookups such as roles, statuses, and types.",
      icon: <FaListAlt className="w-10 h-10" />,
      route: "/hr/setup/lookup-management",
    },
    {
      title: "Permission Management",
      description:
        "Create, edit, and delete granular system permissions.",
      icon: <FaListAlt className="w-10 h-10" />,
      route: "/hr/setup/permission-management",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Admin Setup</h1>

        <p className="mt-2 text-text-light">
          Configure system lookups and base settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {setupItems.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.route)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
          >
            <div className="border-b border-primary-100 bg-primary-50 px-6 py-7">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 text-white transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-primary-700">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm text-text-light">
                    Configuration
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="leading-7 text-text-light">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Setup;
