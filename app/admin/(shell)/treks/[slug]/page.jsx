import { notFound } from "next/navigation";
import { getTrekBySlug } from "@/lib/treks";
import TrekForm from "@/components/admin/TrekForm";

export default async function EditTrekPage({ params }) {
  const trek = await getTrekBySlug(params.slug);
  if (!trek) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">Edit trek</h1>
        <p className="mt-1 text-sm text-ink/50">{trek.name}</p>
      </div>
      <TrekForm initialData={trek} isEdit={true} />
    </div>
  );
}
