import TrekForm from "@/components/admin/TrekForm";

export default function NewTrekPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">Add new trek</h1>
        <p className="mt-1 text-sm text-ink/50">Fill in the details below to add a new trek to the site.</p>
      </div>
      <TrekForm isEdit={false} />
    </div>
  );
}
