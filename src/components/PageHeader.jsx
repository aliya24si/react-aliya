export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex items-start justify-between p-4">
      <div className="flex flex-col text-left">
        <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
        <div className="mt-2 flex items-center space-x-2 font-medium">
          <span className="text-gray-500">
            {Array.isArray(breadcrumb) ? breadcrumb.join(" / ") : breadcrumb}
          </span>
        </div>
      </div>

      {/* Children di sini akan berisi tombol "Add" yang dikirim dari tiap halaman */}
      <div>{children}</div>
    </div>
  );
}