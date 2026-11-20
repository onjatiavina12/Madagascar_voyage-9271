import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

// Envoi d'une demande de devis (persistée côté API).
export function useSubmitQuote() {
  return useMutation(orpc.quote.submit.mutationOptions());
}
