import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-provider";

export function useWishlist(tourId: string | undefined) {
  const { user } = useAuth();
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: ["wishlist", user?.id, tourId],
    enabled: !!user?.id && !!tourId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wishlist")
        .select("id")
        .eq("user_id", user!.id)
        .eq("tour_id", tourId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const toggle = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please sign in to save tours to your wishlist.");
      if (!tourId) return;
      if (q.data) {
        const { error } = await supabase.from("wishlist").delete().eq("id", q.data.id);
        if (error) throw error;
        return false;
      }
      const { error } = await supabase.from("wishlist").insert({ user_id: user.id, tour_id: tourId });
      if (error) throw error;
      return true;
    },
    onSuccess: (added) => {
      qc.invalidateQueries({ queryKey: ["wishlist", user?.id, tourId] });
      if (added === true) toast.success("Added to wishlist");
      if (added === false) toast.success("Removed from wishlist");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { isSaved: !!q.data, toggle: () => toggle.mutate(), isPending: toggle.isPending };
}
