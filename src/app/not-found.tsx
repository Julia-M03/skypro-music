import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p> Возможно, она была удалена или перенесена на другой адрес </p>
      <Link href="/music"> Вернуться на главную </Link>
    </div>
  )
}
