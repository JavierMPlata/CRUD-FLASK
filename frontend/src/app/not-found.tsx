import ErrorPage from '@/components/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      title="Página no encontrada"
      message="Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación."
      statusCode={404}
      showRetry={false}
      showHome={true}
    />
  );
}