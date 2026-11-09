import React from 'react';

const SkillBadge = ({ skill, showProficiency = true, size = 'md' }) => {
  const [imgError, setImgError] = React.useState(false);
  if (!skill) return null;

  const sizePadding = {
    sm: 'p-3',
    md: 'p-3.5 sm:p-4',
    lg: 'p-5'
  }[size] || 'p-3.5 sm:p-4';

  // Official SVG tech logos mapped by skill name
  const getSkillLogoUrl = (skillName) => {
    if (!skillName) return null;
    const name = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const logoMap = {
      react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      reactjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      js: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      ts: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      expressjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      mongo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      github: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      tailwindcss: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      next: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      postgres: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      vuejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      graphql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
    };
    return logoMap[name] || null;
  };

  const getDefaultIcon = (skillName) => {
    const name = (skillName || '').toLowerCase();
    const iconMap = {
      react: '⚛️',
      javascript: '🟨',
      typescript: '🔷',
      nodejs: '🟢',
      'node.js': '🟢',
      mongodb: '🍃',
      express: '🚀',
      css: '🎨',
      html: '📄',
      python: '🐍',
      java: '☕',
      git: '📂',
      docker: '🐳',
      aws: '☁️',
      azure: '☁️',
      mysql: '🗄️',
      postgresql: '🐘',
      redis: '🔴',
      vue: '💚',
      angular: '🔴',
      php: '🐘',
      graphql: '💜',
      rest: '🌐',
      api: '🔌'
    };
    return iconMap[name] || '💻';
  };

  const currentProficiency =
    skill.proficiency ||
    (skill.level === 'Expert'
      ? 95
      : skill.level === 'Advanced'
        ? 88
        : skill.level === 'Intermediate'
          ? 75
          : skill.level === 'Beginner'
            ? 60
            : skill.isCore
              ? 90
              : 85);

  const levelText =
    skill.level ||
    (currentProficiency >= 90
      ? 'Expert'
      : currentProficiency >= 75
        ? 'Advanced'
        : currentProficiency >= 60
          ? 'Intermediate'
          : 'Proficient');

  const logoUrl = !imgError ? getSkillLogoUrl(skill.name) : null;

  return (
    <div className={`rounded-xl border border-slate-200 bg-white ${sizePadding} shadow-2xs hover:border-slate-400 transition-colors flex flex-col justify-between h-full min-h-[135px]`}>
      <div>
        {/* Top Header: Logo & Level Badge */}
        <div className="flex items-center justify-between gap-1.5 mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={skill.name}
                onError={() => setImgError(true)}
                className="w-5 h-5 object-contain"
              />
            ) : (
              <span className="text-base leading-none">
                {skill.icon || getDefaultIcon(skill.name)}
              </span>
            )}
          </div>

          {showProficiency && (
            <span className="text-[10px] font-mono uppercase font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded">
              {levelText}
            </span>
          )}
        </div>

        {/* Skill Name */}
        <h3 className="font-bold text-slate-900 text-sm tracking-tight truncate leading-snug">
          {skill.name}
        </h3>

        {/* Category */}
        {skill.category && (
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 truncate">
            {skill.category.replace('-', ' ')}
          </p>
        )}
      </div>

      <div className="mt-2.5">
        {/* Proficiency Bar & Percentage */}
        {showProficiency && (
          <div className="space-y-1 pt-1.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="uppercase">Proficiency</span>
              <span className="font-semibold text-slate-900">{currentProficiency}%</span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-500"
                style={{ width: `${currentProficiency}%` }}
              />
            </div>
          </div>
        )}

        {/* Years of Experience / Core Badge */}
        <div className="flex items-center justify-between gap-1 mt-1.5">
          {skill.yearsOfExperience ? (
            <span className="text-[10px] font-mono text-slate-400 truncate">
              {skill.yearsOfExperience}y exp.
            </span>
          ) : (
            <span />
          )}

          {skill.isCore && (
            <span className="bg-slate-900 text-white text-[9px] uppercase font-mono font-semibold px-1.5 py-0.2 rounded">
              Core Stack
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillBadge;
