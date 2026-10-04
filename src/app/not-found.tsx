import { redirect } from 'next/navigation'

// Rota inexistente: o visitante nunca vê um beco sem saída, volta direto para a home.
export default function NotFound() {
  redirect('/')
}
