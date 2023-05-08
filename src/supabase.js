import { createClient } from "@supabase/supabase-js";
import { apiKey } from "./api.js";

const supabaseUrl = "https://fheflbplfxywccnqahvk.supabase.co";
const supabaseKey = apiKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
