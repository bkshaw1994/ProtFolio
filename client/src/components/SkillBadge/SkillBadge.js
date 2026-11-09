import React from 'react';

const SkillBadge = ({ skill, showProficiency = true, size = 'md' }) => {
  const [imgError, setImgError] = React.useState(false);
  if (!skill) return null;

  const sizeClasses = {
    sm: 'p-3 sm:p-4',
    md: 'p-3.5 sm:p-5',
    lg: 'p-5 sm:p-6'
  };

  const iconImageSizes = {
    sm: 'w-5 h-5 sm:w-6 sm:h-6',
    md: 'w-7 h-7 sm:w-9 sm:h-9',
    lg: 'w-10 h-10 sm:w-12 sm:h-12'
  };

  const iconTextSizes = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl'
  };

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
    const name = skillName.toLowerCase();
    const iconMap = {
      react: '⚛️',
      javascript: 'JS',
      typescript: 'TS',
      nodejs: 'Node',
      'node.js': 'Node',
      mongodb: '🍃',
      express: 'Ex',
      css: 'CSS',
      html: 'HTML',
      python: 'Py',
      java: 'Java',
      git: 'Git',
      docker: '🐳',
      aws: 'AWS',
      azure: 'Cloud',
      mysql: 'SQL',
      postgresql: 'PG',
      redis: 'Redis',
      vue: 'Vue',
      angular: 'NG',
      php: 'PHP',
      laravel: 'Laravel',
      django: 'Django',
      flask: 'Flask',
      graphql: 'GQL',
      rest: 'REST',
      api: 'API'
    };

    return iconMap[name] || '💻';
  };

  const getLevelBadge = (level, proficiency) => {
    const lvl =
      level ||
      (proficiency >= 90
        ? 'Expert'
        : proficiency >= 75
          ? 'Advanced'
          : proficiency >= 60
            ? 'Intermediate'
            : 'Beginner');

    const badgeStyles = {
      Expert: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      Advanced: 'bg-slate-900 text-white border-slate-900',
      Intermediate: 'bg-slate-100 text-slate-700 border-slate-200',
      Beginner: 'bg-slate-50 text-slate-500 border-slate-200'
    };

    return (
      <span
        className={`text-2xs font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border flex-shrink-0 ${
          badgeStyles[lvl] || badgeStyles.Advanced
        }`}
      >
        {lvl}
      </span>
    );
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

  const rawLogo =
    skill.icon && skill.icon.startsWith('http')
      ? skill.icon
      : getSkillLogoUrl(skill.name);
  const logoUrl = imgError ? null : rawLogo;

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 ${
        sizeClasses[size] || 'p-3.5 sm:p-5'
      } shadow-2xs hover:border-slate-400 transition-colors flex flex-col justify-between h-full min-h-[140px] group`}
    >
      <div>
        {/* Top Header: Skill Icon & Level Badge Pill */}
        <div className="flex items-center justify-between gap-1.5 mb-2.5">
          <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg group-hover:bg-slate-100 transition-colors flex-shrink-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={skill.name}
                onError={() => setImgError(true)}
                className={`${iconImageSizes[size]} object-contain`}
              />
            ) : (
              <div className={`${iconTextSizes[size]} font-mono font-bold text-slate-700`}>
                {skill.icon || getDefaultIcon(skill.name)}
              </div>
            )}
          </div>

          {showProficiency && getLevelBadge(skill.level, currentProficiency)}
        </div>

        {/* Skill Name */}
        <h3 className="font-bold text-slate-950 text-sm sm:text-base tracking-tight truncate leading-snug">
          {skill.name}
        </h3>

        {/* Category */}
        {skill.category && (
          <p className="text-2xs font-mono text-slate-500 uppercase tracking-wider mb-1 truncate">
            {skill.category.replace('-', ' ')}
          </p>
        )}
      </div>

      <div className="mt-2.5">
        {/* Proficiency Bar & Percentage */}
        {showProficiency && (
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-2xs font-mono">
              <span className="uppercase tracking-wider text-slate-500">
                Proficiency
              </span>
              <span className="font-bold text-slate-950">
                {currentProficiency}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  currentProficiency >= 90 ? 'bg-emerald-500' : 'bg-slate-900'
                }`}
                style={{ width: `${currentProficiency}%` }}
              />
            </div>
          </div>
        )}

        {/* Years of Experience / Core Badge */}
        <div className="flex items-center justify-between gap-1 mt-2">
          {skill.yearsOfExperience ? (
            <span className="text-2xs font-mono text-slate-500 truncate">
              {skill.yearsOfExperience}y exp.
            </span>
          ) : (
            <span />
          )}

          {skill.isCore && (
            <span className="bg-slate-950 text-white text-2xs font-mono uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
              Core
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillBadge;
