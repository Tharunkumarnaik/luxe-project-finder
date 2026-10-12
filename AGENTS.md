<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep public content on separate TanStack file routes with leaf-specific metadata; service and project parents render Outlet so detail URLs resolve correctly.
- Keep studio content in shared browser-safe data modules and reusable studio components to avoid monolithic pages and duplicated business facts.
- Keep selected design preferences in a root React context, not browser storage, so navigation preserves choices without unconsented persistence.
- Submit enquiries through a Zod-validated public server function using an RLS-scoped publishable client; never expose enquiry read access to visitors.
- Reviews may be submitted publicly but remain private until approved; only approved review content is publicly readable.
- Use semantic visual tokens from the global stylesheet, and explicitly label generated concept imagery rather than imply completed client work.
- Keep motion as progressive enhancement in the shared studio motion controller and global CSS; use compositor-friendly animation and respect reduced-motion preferences so content and navigation never depend on animation.
