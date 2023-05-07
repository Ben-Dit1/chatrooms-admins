import { Organization } from '@/constants/Types';

export default function Dropdown({
  organizations,
}: {
  organizations: Organization[];
}) {
  return (
    <div>
      <label
        htmlFor="orgSelector"
        className="block text-sm leading-2 text-gray-900"
      >
        Organizations
      </label>
      <select
        className="block w-full rounded-md -mt-4 border-0 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={organizations[0].id}
        onChange={(e) => console.log(e.target.value)}
      >
        {organizations.map((organization) => {
          return (
            <option key={organization.id} value={organization.id}>
              {organization.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
