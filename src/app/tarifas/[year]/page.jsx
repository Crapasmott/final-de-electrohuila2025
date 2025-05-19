import TarifasDetailClient from './client-component';

export async function generateStaticParams() {
  return [
    { year: '2023' },
    { year: '2024' },
    { year: '2025' },
  ];
}

export default function TarifasDetailPage({ params }) {
  const { year } = params;
  
  return <TarifasDetailClient year={year} />;
}