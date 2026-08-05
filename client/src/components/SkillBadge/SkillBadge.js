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
    md: 'w-7 h-7 sm:w-10 sm:h-10',
    lg: 'w-10 h-10 sm:w-14 sm:h-14'
  };

  const iconTextSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-4xl',
    lg: 'text-4xl sm:text-6xl'
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

  // Default icon based on skill name if no icon provided
  const getDefaultIcon = (skillName) => {
    const name = skillName.toLowerCase();

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
      laravel: '🎵',
      django: '🐍',
      flask: '🍶',
      graphql: '💜',
      rest: '🌐',
      api: '🔌'
    };

    return iconMap[name] || '💻';
  };

  const proficiencyColor = (proficiency) => {
    if (proficiency >= 90) return 'text-emerald-600';
    if (proficiency >= 75) return 'text-primary-600';
    if (proficiency >= 60) return 'text-amber-600';
    return 'text-slate-600';
  };

  const getLevelBadge = (level, proficiency) => {
    const lvl = level || (proficiency >= 90 ? 'Expert' : proficiency >= 75 ? 'Advanced' : proficiency >= 60 ? 'Intermediate' : 'Beginner');
    const badgeColors = {
      Expert: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
      Advanced: 'bg-primary-500/10 text-primary-600 border-primary-500/30',
      Intermediate: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
      Beginner: 'bg-slate-500/10 text-slate-600 border-slate-500/30'
    };
    return (
      <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex-shrink-0 ${badgeColors[lvl] || badgeColors.Advanced}`}>
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

  const rawLogo = (skill.icon && skill.icon.startsWith('http')) ? skill.icon : getSkillLogoUrl(skill.name);
  const logoUrl = imgError ? null : rawLogo;

  return (
    <div
      className={`glass-card ${sizeClasses[size] || 'p-3.5 sm:p-5'} group hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/80 hover:border-primary-400/40 hover:shadow-xl hover:shadow-primary-500/10 rounded-2xl flex flex-col justify-between relative bg-white/90 backdrop-blur-xl h-full min-h-[140px]`}
    >
      <div>
        {/* Top Header: Skill Icon & Level Badge Pill */}
        <div className="flex items-center justify-between gap-1.5 mb-2">
          <div className="p-1.5 sm:p-2 bg-slate-100/80 rounded-xl group-hover:bg-primary-50 transition-colors flex-shrink-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={skill.name}
                onError={() => setImgError(true)}
                className={`${iconImageSizes[size]} object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm`}
              />
            ) : (
              <div className={`${iconTextSizes[size]} group-hover:scale-110 transition-transform duration-300 drop-shadow-sm`}>
                {skill.icon || getDefaultIcon(skill.name)}
              </div>
            )}
          </div>

          {showProficiency && getLevelBadge(skill.level, currentProficiency)}
        </div>

        {/* Skill Name */}
        <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-primary-600 transition-colors tracking-tight truncate leading-snug">
          {skill.name}
        </h3>

        {/* Category or Experience Subtitle */}
        {skill.category && (
          <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 capitalize mb-1 truncate">
            {skill.category.replace('-', ' ')}
          </p>
        )}
      </div>

      <div className="mt-2">
        {/* Proficiency Bar & Percentage */}
        {showProficiency && (
          <div className="space-y-1 pt-1.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Proficiency</span>
              <span className={`text-[11px] sm:text-xs font-extrabold ${proficiencyColor(currentProficiency)}`}>
                {currentProficiency}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full bg-slate-200/90 rounded-full h-2 overflow-hidden p-0.5 border border-slate-300/50">
              <div
                className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${
                  currentProficiency >= 90
                    ? 'from-emerald-500 to-teal-400'
                    : currentProficiency >= 75
                      ? 'from-primary-600 to-indigo-500'
                      : currentProficiency >= 60
                        ? 'from-amber-500 to-yellow-400'
                        : 'from-slate-500 to-slate-400'
                }`}
                style={{ width: `${currentProficiency}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Years of Experience / Core Badge */}
        <div className="flex items-center justify-between gap-1 mt-1.5">
          {skill.yearsOfExperience ? (
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 truncate">
              {skill.yearsOfExperience}y exp.
            </span>
          ) : <span />}

          {skill.isCore && (
            <span className="bg-primary-500/10 text-primary-600 text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded border border-primary-500/20 flex-shrink-0">
              Core
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillBadge;
