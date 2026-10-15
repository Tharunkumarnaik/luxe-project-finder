import { createServerFn } from '@tanstack/react-start';

export const GOOGLE_PLACE_ID = 'ChIJ1chycDLzTDoR-UCYB1-ZvgM';

export type GoogleReview = {
  author: string;
  photo: string | null;
  authorUri: string | null;
  rating: number;
  text: string;
  date: string | null;
  relative: string | null;
};
export type GoogleReviewsResult = {
  ok: boolean;
  rating: number | null;
  total: number | null;
  mapsUri: string | null;
  reviews: GoogleReview[];
};

let cache: { at: number; data: GoogleReviewsResult } | null = null;

export const getGoogleReviews = createServerFn({ method: 'GET' }).handler(async (): Promise<GoogleReviewsResult> => {
  if (cache && Date.now() - cache.at < 6 * 60 * 60 * 1000) return cache.data;
  const empty: GoogleReviewsResult = { ok: false, rating: null, total: null, mapsUri: null, reviews: [] };
  const lovable = process.env['LOVABLE_API_KEY'];
  const maps = process.env['GOOGLE_MAPS_API_KEY'];
  if (!lovable || !maps) return empty;
  try {
    const res = await fetch(`https://connector-gateway.lovable.dev/google_maps/places/v1/places/${GOOGLE_PLACE_ID}`, {
      headers: {
        Authorization: `Bearer ${lovable}`,
        'X-Connection-Api-Key': maps,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
    });
    if (!res.ok) {
      console.error(`Google reviews failed [${res.status}]: ${await res.text()}`);
      return empty;
    }
    const j: any = await res.json();
    const data: GoogleReviewsResult = {
      ok: true,
      rating: j.rating ?? null,
      total: j.userRatingCount ?? null,
      mapsUri: j.googleMapsUri ?? null,
      reviews: (j.reviews ?? []).map((r: any) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        photo: r.authorAttribution?.photoUri ?? null,
        authorUri: r.authorAttribution?.uri ?? null,
        rating: r.rating ?? 0,
        text: r.originalText?.text ?? r.text?.text ?? '',
        date: r.publishTime ?? null,
        relative: r.relativePublishTimeDescription ?? null,
      })),
    };
    cache = { at: Date.now(), data };
    return data;
  } catch (e) {
    console.error('Google reviews error', e);
    return empty;
  }
});
