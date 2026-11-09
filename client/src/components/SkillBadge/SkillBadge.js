import React, { useState } from 'react';

const SkillBadge = ({ skill, showProficiency = true, size = 'md' }) => {
  const [imgError, setImgError] = useState(false);
  if (!skill) return null;

  const sizeClasses = {
    sm: 'p-3.5 sm:p-4',
    md: 'p-4 sm:p-5',
    lg: 'p-5 sm:p-6'
  };

  const iconContainerSizes = {
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-12 h-12 sm:w-14 sm:h-14'
  };

  const iconImageSizes = {
    sm: 'w-5 h-5 sm:w-6 sm:h-6',
    md: 'w-6 h-6 sm:w-7 sm:h-7',
    lg: 'w-8 h-8 sm:w-9 sm:h-9'
  };

  // Comprehensive official SVG tech logos mapped by skill name
  const getSkillLogoUrl = (skillName) => {
    if (!skillName) return null;
    const name = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const logoMap = {
      react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      reactjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      reactnative: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      js: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      es6: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
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
      amazonwebservices: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      reduxtoolkit: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
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
      vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      jest: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
      webpack: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
      npm: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
      linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
      socketio: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
      firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
    };
    return logoMap[name] || null;
  };

  const getDefaultIcon = (skillName) => {
    const name = skillName.toLowerCase();
    const iconMap = {
      react: '⚛️',
      javascript: '⚡',
      typescript: '🔷',
      nodejs: '🟢',
      'node.js': '🟢',
      mongodb: '🍃',
      express: '🚂',
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
      angular: '🔺',
      php: '🐘',
      graphql: '💜',
      rest: '🌐',
      api: '🔌'
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
      Expert: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
      Advanced: 'bg-slate-100 text-slate-800 border-slate-200',
      Intermediate: 'bg-amber-50 text-amber-700 border-amber-200/90',
      Beginner: 'bg-slate-50 text-slate-600 border-slate-200'
    };

    return (
      <span
        className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border flex-shrink-0 ${
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
      className={`bg-white rounded-xl border border-slate-200 hover:border-slate-400 ${
        sizeClasses[size] || 'p-4 sm:p-5'
      } shadow-2xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full min-h-[155px] group cursor-pointer`}
    >
      <div>
        {/* Top Header: Elevated Tech Icon & Level Badge */}
        <div className="flex items-center justify-between gap-1.5 mb-3">
          <div
            className={`${
              iconContainerSizes[size] || 'w-10 h-10 sm:w-12 sm:h-12'
            } rounded-xl bg-slate-50 border border-slate-200/80 group-hover:border-slate-300 group-hover:bg-white flex items-center justify-center p-2 shadow-2xs transition-all duration-200 flex-shrink-0`}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={skill.name}
                onError={() => setImgError(true)}
                className={`${iconImageSizes[size] || 'w-6 h-6 sm:w-7 sm:h-7'} object-contain transition-transform duration-200 group-hover:scale-110`}
              />
            ) : (
              <div className="text-lg sm:text-xl transition-transform duration-200 group-hover:scale-110 select-none">
                {skill.icon || getDefaultIcon(skill.name)}
              </div>
            )}
          </div>

          {showProficiency && getLevelBadge(skill.level, currentProficiency)}
        </div>

        {/* Skill Name */}
        <h3 className="font-bold text-slate-950 text-sm sm:text-base tracking-tight truncate leading-tight group-hover:text-slate-900">
          {skill.name}
        </h3>

        {/* Category */}
        {skill.category && (
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5 truncate">
            {skill.category.replace('-', ' ')}
          </p>
        )}
      </div>

      <div className="mt-3">
        {/* Proficiency Bar & Percentage */}
        {showProficiency && (
          <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
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
        <div className="flex items-center justify-between gap-1 mt-2.5">
          {skill.yearsOfExperience ? (
            <span className="text-[11px] font-mono text-slate-400 truncate">
              {skill.yearsOfExperience}y exp.
            </span>
          ) : (
            <span />
          )}

          {skill.isCore && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 text-white shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Core
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillBadge;
