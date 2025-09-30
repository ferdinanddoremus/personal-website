import { Link } from 'waku';

export const Header = () => {
  return (
    <header className="w-full mb-[calc(var(--line-height)*2)]">
      <table className="relative w-[calc(round(down,100%,1ch))] border-collapse top-[calc(var(--line-height)/2)]">
        <thead>
          <tr>
            <td className="table-border w-full pt-[calc((var(--line-height)/2)-2)]" colSpan={2} rowSpan={2}>
              <Link to="/" className="font-bold text-lg leading-[calc(var(--line-height)*2)] uppercase">~/groremus</Link>
              <nav className="flex gap-ch">
                <Link to="/about" className="hover:underline">about</Link>
                <Link to="/writings" className="hover:underline">writings</Link>
              </nav>
            </td>
            <th className="table-border font-bold pt-[calc((var(--line-height)/2)-2)]">
              version
            </th>
            <td className="table-border min-w-0 text-right pt-[calc((var(--line-height)/2)-2)]">
              v0.1.0
            </td>
          </tr>
          <tr>
            <td className="table-border font-bold">
              updated
            </td>
            <td className="table-border min-w-0 text-right">
              2025-09-29
            </td>
          </tr>
        </thead>
      </table>
    </header>
  );
};
